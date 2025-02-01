import supertest from "supertest";
import app, { server } from "../index";
import mongoose from "mongoose";
import { mockNotes, mockUser } from "./mockData";
import UserModel from "../models/user";
import NoteCollectionModel from "../models/noteCollection";
import assert from "node:assert";
import helpers, { NoteCollectionFromBackend, NoteFromBackend } from "./helpers";
import { z } from "zod";
import NoteModel from "../models/note";
import {
  NoteCollectionSchema,
  PopulatedNoteCollectionSchema,
} from "../schemas/noteCollectionSchema";
import { NoteSchema, PopulatedNoteSchema } from "../schemas/noteSchema";
import { AuthResponseSchema } from "../schemas/userSchema";

const api = supertest(app);

let token: string;
let user: {
  id: string;
  username: string;
};
let noteCollections: NoteCollectionFromBackend[] = [];
const initialCollections = [
  { title: "Collection 1", description: "Test collection 1" },
];
const initialNotes = mockNotes;
let notes: NoteFromBackend[] = [];

const fetchNoteCollections = async (): Promise<NoteCollectionFromBackend[]> => {
  const res = await api
    .get("/api/collections")
    .set("Authorization", `Bearer ${token}`)
    .expect(200);

  const collections = helpers.parseBody(res, z.array(NoteCollectionSchema));

  return collections;
};

const fetchNotes = async (): Promise<NoteFromBackend[]> => {
  const res = await api
    .get("/api/notes")
    .set("Authorization", `Bearer ${token}`)
    .expect(200);

  const notes = helpers.parseBody(res, z.array(NoteSchema));
  return notes;
};

beforeEach(async () => {
  await NoteCollectionModel.deleteMany({});
  await UserModel.deleteMany({});
  await NoteModel.deleteMany({});

  const newUser = new UserModel(mockUser);
  await newUser.save();

  let newNote = new NoteModel({
    ...initialNotes[0],
    user: newUser._id,
  });
  await newNote.save();

  newUser.notes = newUser.notes.concat(newNote._id);
  await newUser.save();

  newNote = new NoteModel({
    ...initialNotes[1],
    user: newUser._id,
  });
  await newNote.save();

  newUser.notes = newUser.notes.concat(newNote._id);
  await newUser.save();

  const newCollection = new NoteCollectionModel({
    ...initialCollections[0],
    users: [newUser._id],
    notes: [newNote._id],
  });
  await newCollection.save();

  newUser.noteCollections = newUser.noteCollections.concat(newCollection._id);
  await newUser.save();

  const loginRes = await api
    .post("/api/login")
    .send({
      username: "TestUser",
      password: "TestUser",
    })
    .expect(200);

  const auth = helpers.parseBody(loginRes, AuthResponseSchema);

  token = auth.token;
  user = auth.user;

  noteCollections = await fetchNoteCollections();
  notes = await fetchNotes();
});

describe("get collections", () => {
  test("all collections are returned with correct data", () => {
    assert.strictEqual(noteCollections.length, initialCollections.length);
    assert.strictEqual(noteCollections[0].title, initialCollections[0].title);
  });

  test("returns single note with correct data", async () => {
    const res = await api
      .get(`/api/collections/${noteCollections[0].id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    const collection = helpers.parseBody(res, PopulatedNoteCollectionSchema);
    assert.strictEqual(collection.title, noteCollections[0].title);
  });

  test("returns 404 if collection doesn't exist", async () => {
    const nonexistentCollectionId = new mongoose.Types.ObjectId();
    await api
      .get(`/api/collections/${nonexistentCollectionId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("returns bad request without access token", async () => {
    await api.get("/api/collections").expect(401);
  });
});

describe("post collection", () => {
  const testCollection = {
    title: "Test Collection",
    description: "Test description for collection",
    notes: [],
  };

  test("works with valid token & data", async () => {
    const initialCollectionCount = noteCollections.length;

    await api
      .post("/api/collections")
      .set("Authorization", `Bearer ${token}`)
      .send(testCollection)
      .expect(201);

    const updatedCollections = await fetchNoteCollections();
    assert.strictEqual(updatedCollections.length, initialCollectionCount + 1);
  });

  test("returns 401 unauthorized without access token", async () => {
    await api.post("/api/collections").send(testCollection).expect(401);
  });

  test("returns 400 bad request with invalid data", async () => {
    const invalidCollections = [
      { ...testCollection, title: null },
      { ...testCollection, description: null },
    ];

    for (const invalidCollection of invalidCollections) {
      await api
        .post("/api/collections")
        .set("Authorization", `Bearer ${token}`)
        .send(invalidCollection)
        .expect(400);
    }
  });
});

describe("update collection", () => {
  test("works with valid access token & data", async () => {
    assert.ok(noteCollections.length > 0);

    const collectionToUpdate = noteCollections[0];

    const updatedCollectionData = {
      ...collectionToUpdate,
      title: "Updated Collection Title",
      description: "Updated description",
    };

    const putRes = await api
      .put(`/api/collections/${collectionToUpdate.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedCollectionData)
      .expect(200);

    const collection = helpers.parseBody(putRes, PopulatedNoteCollectionSchema);

    assert.strictEqual(collection.title, updatedCollectionData.title);
    assert.strictEqual(collection.id, updatedCollectionData.id);
  });

  test("adding new notes to collection works and sets note's collection property", async () => {
    assert.ok(noteCollections.length > 0);
    assert.ok(notes.length > 0);

    const collectionToUpdate = noteCollections[0];
    const newNoteToCollection = notes[0];

    const newNotes = collectionToUpdate.notes.concat(notes[0].id);

    const newCollectionData = {
      ...collectionToUpdate,
      notes: newNotes,
    };

    const putRes = await api
      .put(`/api/collections/${collectionToUpdate.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(newCollectionData)
      .expect(200);

    const updatedCollection = helpers.parseBody(
      putRes,
      PopulatedNoteCollectionSchema,
    );

    assert.deepStrictEqual(
      updatedCollection.notes.map((note) => note.id),
      newCollectionData.notes,
    );

    const getRes = await api
      .get(`/api/notes/${newNoteToCollection.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    const updatedNote = helpers.parseBody(getRes, PopulatedNoteSchema);

    assert.ok(updatedNote.noteCollection !== null);
    assert.strictEqual(updatedNote.noteCollection.id, updatedCollection.id);
  });

  test("removing notes from collection works and sets note's collection property to null", async () => {
    assert.ok(noteCollections.length > 0);
    assert.ok(notes.length > 0);

    const collectionRes = await api
      .get(`/api/collections/${noteCollections[0].id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    const collectionBefore = helpers.parseBody(
      collectionRes,
      PopulatedNoteCollectionSchema,
    );
    let collectionNoteIds = collectionBefore.notes.map((note) => note.id);

    assert.ok(collectionNoteIds.includes(notes[1].id));

    const newCollectionData = {
      ...collectionBefore,
      notes: [],
      users: collectionBefore.users.map((user) => user.id),
    };

    const putRes = await api
      .put(`/api/collections/${collectionBefore.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(newCollectionData)
      .expect(200);

    const collectionAfter = helpers.parseBody(
      putRes,
      PopulatedNoteCollectionSchema,
    );
    collectionNoteIds = collectionAfter.notes.map((note) => note.id);

    assert.ok(!collectionNoteIds.includes(notes[1].id));
    assert.strictEqual(
      collectionAfter.notes.length,
      collectionBefore.notes.length - 1,
    );

    const getRes = await api
      .get(`/api/notes/${notes[1].id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    const note = helpers.parseBody(getRes, PopulatedNoteSchema);
    assert.ok(note.noteCollection === null);
  });

  test("returns 401 unauthorized with no access token", async () => {
    assert.ok(noteCollections.length > 0);

    const collectionToUpdate = noteCollections[0];

    const updatedCollectionData = {
      ...collectionToUpdate,
      title: "Updated Collection Title",
    };

    await api
      .put(`/api/collections/${collectionToUpdate.id}`)
      .send(updatedCollectionData)
      .expect(401);
  });

  test("returns 400 bad request with invalid data", async () => {
    assert.ok(noteCollections.length > 0);

    const collectionToUpdate = noteCollections[0];

    const updatedCollectionData = {
      ...collectionToUpdate,
      title: null,
    };

    await api
      .put(`/api/collections/${collectionToUpdate.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedCollectionData)
      .expect(400);
  });
});

describe("delete note collection", () => {
  test("works and deletes the notes that are in it", async () => {
    const note1 = await new NoteModel(mockNotes[0]).save();

    const noteCollectionToDelete = new NoteCollectionModel({
      title: "Test Collection",
      description: "A test collection",
      notes: [note1._id],
      users: [user.id],
    });

    await noteCollectionToDelete.save();

    await api
      .delete(`/api/collections/${noteCollectionToDelete._id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const deletedCollection = await NoteCollectionModel.findById(
      noteCollectionToDelete.id,
    );
    expect(deletedCollection).toBeNull();

    await api
      .get(`/api/notes/${note1._id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("returns 401 with no access token", async () => {
    assert.ok(noteCollections.length > 0);

    const collectionToDelete = noteCollections[0];

    await api.delete(`/api/collections/${collectionToDelete.id}`).expect(401);

    const newCollections = await fetchNoteCollections();

    assert.strictEqual(newCollections.length, noteCollections.length);
  });

  test("returns 404 if collection doesn't exist", async () => {
    const nonexistentCollectionId = new mongoose.Types.ObjectId();
    await api
      .delete(`/api/collections/${nonexistentCollectionId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});
