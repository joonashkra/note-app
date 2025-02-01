import supertest from "supertest";
import app, { server } from "../index";
import mongoose from "mongoose";
import { mockNotes, mockUser, mockUser2 } from "./mockData";
import NoteModel from "../models/note";
import UserModel from "../models/user";
import assert from "node:assert";
import helpers, { NoteFromBackend } from "./helpers";
import { z } from "zod";
import { AuthResponseSchema } from "../schemas/userSchema";
import { NoteSchema, PopulatedNoteSchema } from "../schemas/noteSchema";
import NoteCollectionModel from "../models/noteCollection";
import { NoteCollectionSchema } from "../schemas/noteCollectionSchema";

const api = supertest(app);

let token: string;
let notes: NoteFromBackend[] = [];
const initialNotes = mockNotes;
const initialCollections = [
  { title: "Collection 1", description: "Test collection 1", notes: [] },
];

const fetchNotes = async (): Promise<NoteFromBackend[]> => {
  const res = await api
    .get("/api/notes")
    .set("Authorization", `Bearer ${token}`)
    .expect(200);

  const notes = helpers.parseBody(res, z.array(NoteSchema));

  return notes;
};

beforeEach(async () => {
  await NoteModel.deleteMany({});
  await UserModel.deleteMany({});

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

  notes = await fetchNotes();
});

describe("get notes", () => {
  test("all notes are returned with correct data", () => {
    assert.strictEqual(notes.length, initialNotes.length - 1); // initialNotes.length - 1, since only 2 notes belong to logged in user atm
    const noteTitles = notes.map((note) => note.title);
    assert(noteTitles.includes(initialNotes[0].title));
  });

  test("returns single note with correct data", async () => {
    const res = await api
      .get(`/api/notes/${notes[0].id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    const note = helpers.parseBody(res, PopulatedNoteSchema);
    assert.strictEqual(note.title, notes[0].title);
  });

  test("returns 404 if note doesn't exist", async () => {
    const nonexistentNoteId = new mongoose.Types.ObjectId();
    await api
      .get(`/api/notes/${nonexistentNoteId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("returns bad request without access token", async () => {
    await api.get("/api/notes").expect(401);
  });

  test("returns only notes that belong to logged in user", async () => {
    const newUser = new UserModel(mockUser2);
    await newUser.save();

    const newNote = new NoteModel({
      ...initialNotes[2],
      user: newUser._id,
    });
    await newNote.save();

    const loginRes = await api
      .post("/api/login")
      .send({
        username: "TestUser2",
        password: "TestUser2",
      })
      .expect(200);

    const auth = helpers.parseBody(loginRes, AuthResponseSchema);

    const token = auth.token;

    const res = await api
      .get("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    const notes = helpers.parseBody(res, z.array(NoteSchema));

    assert.strictEqual(notes.length, 1);
    assert.strictEqual(notes[0].user, newUser._id.toString());
  });
});

describe("post note", () => {
  const testNote = {
    title: "testNote",
    description: "testNote",
    deadlineDate: "2025-05-30T22:00:00",
    noteCollection: null,
  };

  test("works with valid token & data", async () => {
    const initialNoteCount = notes.length;

    await api
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send(testNote)
      .expect(201);

    const updatedNotes = await fetchNotes();
    assert.strictEqual(updatedNotes.length, initialNoteCount + 1);
  });

  test("returns 401 unauthorized without access token", async () => {
    await api.post("/api/notes").send(testNote).expect(401);
  });

  test("returns 400 bad request with invalid data", async () => {
    const invalidNotes = [
      { ...testNote, title: null },
      { ...testNote, description: null },
    ];

    for (const invalidNote of invalidNotes) {
      await api
        .post("/api/notes")
        .set("Authorization", `Bearer ${token}`)
        .send(invalidNote)
        .expect(400);
    }
  });
});

describe("update note", () => {
  test("works with valid access token & data", async () => {
    assert.ok(notes.length > 0);

    const noteToUpdate = notes[0];

    const updatedNoteData = {
      ...noteToUpdate,
      title: "updatedTitle",
      checked: !notes[0].checked,
    };

    const putRes = await api
      .put(`/api/notes/${noteToUpdate.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedNoteData)
      .expect(200);

    const note = helpers.parseBody(putRes, PopulatedNoteSchema);

    assert.strictEqual(note.title, updatedNoteData.title);
    assert.strictEqual(note.id, updatedNoteData.id);
    assert.strictEqual(note.checked, updatedNoteData.checked);

    const updatedNotes = await fetchNotes();
    const updatedNote = updatedNotes.find(
      (note: NoteFromBackend) => note.id === noteToUpdate.id,
    );

    assert.ok(updatedNote);
    assert.strictEqual(updatedNote.title, updatedNoteData.title);
  });

  test("updating note's collection updates also collection's notes property", async () => {
    const getRes1 = await api
      .get("/api/collections")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    const collectionsBefore = helpers.parseBody(
      getRes1,
      z.array(NoteCollectionSchema),
    );

    const noteToUpdate = notes[0];

    const updatedNoteData = {
      ...noteToUpdate,
      noteCollection: collectionsBefore[0].id,
    };

    const putRes = await api
      .put(`/api/notes/${noteToUpdate.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedNoteData)
      .expect(200);

    const updatedNote = helpers.parseBody(putRes, PopulatedNoteSchema);
    assert.ok(updatedNote.noteCollection !== null);
    assert.strictEqual(updatedNote.noteCollection.id, collectionsBefore[0].id);

    const getRes2 = await api
      .get("/api/collections")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    const collectionsAfter = helpers.parseBody(
      getRes2,
      z.array(NoteCollectionSchema),
    );
    assert.strictEqual(collectionsAfter[0].notes[0], updatedNote.id);
  });

  test("returns 401 unauthorized with no access token", async () => {
    assert.ok(notes.length > 0);

    const noteToUpdate = notes[0];

    const updatedNoteData = {
      ...noteToUpdate,
      title: "updatedTitle",
    };

    await api
      .put(`/api/notes/${noteToUpdate.id}`)
      .send(updatedNoteData)
      .expect(401);
  });

  test("returns 400 bad request with invalid data", async () => {
    assert.ok(notes.length > 0);

    const noteToUpdate = notes[0];

    const updatedNoteData = {
      ...noteToUpdate,
      title: null,
    };

    await api
      .put(`/api/notes/${noteToUpdate.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedNoteData)
      .expect(400);
  });
});

describe("delete note", () => {
  test("works with valid access token", async () => {
    assert.ok(notes.length > 0);

    const noteToDelete = notes[0];

    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const newNotes = await fetchNotes();

    assert.strictEqual(newNotes.length, notes.length - 1);
  });

  test("returns 401 with no access token", async () => {
    assert.ok(notes.length > 0);

    const noteToDelete = notes[0];

    await api.delete(`/api/notes/${noteToDelete.id}`).expect(401);

    const newNotes = await fetchNotes();

    assert.strictEqual(newNotes.length, notes.length);
  });

  test("returns 404 if note doesn't exist", async () => {
    const nonexistentNoteId = new mongoose.Types.ObjectId();
    await api
      .delete(`/api/notes/${nonexistentNoteId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});
