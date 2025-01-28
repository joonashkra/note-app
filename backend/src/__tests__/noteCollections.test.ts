import supertest from "supertest";
import app, { server } from "../index";
import mongoose from "mongoose";
import { mockNotes, mockUser } from "./mockData";
import UserModel from "../models/user";
import NoteCollectionModel from "../models/noteCollection";
import assert from "node:assert";
import { NoteCollection } from "../types/noteCollections";
import { AuthResponseSchema, NoteCollectionSchema } from "../utils/schemas";
import helpers from "./helpers";
import { z } from "zod";
import NoteModel from "../models/note";

const api = supertest(app);

const NoteCollectionsArraySchema = z.array(NoteCollectionSchema);

let token: string;
let user: {
  id: string;
  username: string;
  notes: string[];
};
let noteCollections: NoteCollectionFromBackend[] = [];
const initialCollections = [
  { title: "Collection 1", description: "Test collection 1" },
];

type NoteCollectionFromBackend = Omit<
  NoteCollection,
  "users" | "notes" | "id"
> & {
  users: string[];
  notes: string[];
  id: string;
};

const fetchNoteCollections = async (): Promise<NoteCollectionFromBackend[]> => {
  const res = await api
    .get("/api/collections")
    .set("Authorization", `Bearer ${token}`)
    .expect(200);

  const collections = helpers.parseBody(res, NoteCollectionsArraySchema);

  return collections;
};

beforeEach(async () => {
  await NoteCollectionModel.deleteMany({});
  await UserModel.deleteMany({});
  await NoteModel.deleteMany({});

  const newUser = new UserModel(mockUser);
  await newUser.save();

  const newCollection = new NoteCollectionModel({
    ...initialCollections[0],
    users: [newUser._id],
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
});

describe("get note collections", () => {
  test("all collections are returned", () => {
    assert.strictEqual(noteCollections.length, initialCollections.length);
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

describe("post note collection", () => {
  const testCollection = {
    title: "Test Collection",
    description: "Test description for collection",
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

describe("update note collection", () => {
  test("title and description update works with valid access token & data", async () => {
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

    const collection = helpers.parseBody(putRes, NoteCollectionSchema);

    assert.strictEqual(collection.title, updatedCollectionData.title);
    assert.strictEqual(collection.id, collectionToUpdate.id);
  });

  test("adding and removing notes and users in collection works", async () => {
    assert.ok(noteCollections.length > 0);

    const collectionToUpdate = noteCollections[0];

    const newNotesToCollection = [
      new mongoose.Types.ObjectId().toString(),
      new mongoose.Types.ObjectId().toString(),
    ];

    const newUserToCollection = new mongoose.Types.ObjectId().toString();

    const updatedCollectionData = {
      ...collectionToUpdate,
      notes: collectionToUpdate.notes.concat(newNotesToCollection),
      users: collectionToUpdate.users.concat(newUserToCollection),
    };

    const putRes = await api
      .put(`/api/collections/${collectionToUpdate.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedCollectionData)
      .expect(200);

    const collection = helpers.parseBody(putRes, NoteCollectionSchema);

    assert.deepStrictEqual(collection.notes, updatedCollectionData.notes);
    assert.deepStrictEqual(collection.users, updatedCollectionData.users);
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
  test("deletes a note collection and its notes", async () => {
    const note1 = await new NoteModel(mockNotes[0]).save();
    const note2 = await new NoteModel(mockNotes[1]).save();

    const noteCollectionToDelete: NoteCollection =
      await new NoteCollectionModel({
        title: "Test Collection",
        description: "A test collection",
        notes: [note1._id, note2._id],
        users: [new mongoose.Types.ObjectId(user.id)],
      }).save();

    await api
      .delete(`/api/collections/${noteCollectionToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const deletedCollection = await NoteCollectionModel.findById(
      noteCollectionToDelete.id,
    );
    expect(deletedCollection).toBeNull();

    const deletedNotes = await NoteModel.find({
      _id: { $in: [note1._id, note2._id] },
    });
    expect(deletedNotes.length).toBe(0);
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
