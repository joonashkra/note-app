import supertest from "supertest";
import app, { server } from "../index";
import mongoose from "mongoose";
import { mockNotes, mockUser, mockUser2 } from "./mockData";
import NoteModel from "../models/note";
import UserModel from "../models/user";
import assert from "node:assert";
import { Note } from "../types/notes";
import { AuthResponse } from "../types/users";

const api = supertest(app);

let token: string;
let notes: Note[] = [];
const initialNotes = mockNotes;

//Backend populates note.user as { username, id }, so this is just to make tests easier since the username is not needed here
type NoteWithPopulatedUser = Omit<Note, "user"> & {
  user: { username: string; id: string };
};

const fetchNotes = async (): Promise<Note[]> => {
  const res = await api
    .get("/api/notes")
    .set("Authorization", `Bearer ${token}`)
    .expect(200);

  return res.body.map((note: NoteWithPopulatedUser) => ({
    ...note,
    user: note.user.id,
  }));
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

  newUser.notes = newUser.notes.concat(newNote);
  await newUser.save();

  newNote = new NoteModel({
    ...initialNotes[1],
    user: newUser._id,
  });
  await newNote.save();

  newUser.notes = newUser.notes.concat(newNote);
  await newUser.save();

  const loginRes = await api
    .post("/api/login")
    .send({
      username: "TestUser",
      password: "TestUser",
    })
    .expect(200);

  const auth: AuthResponse = loginRes.body;
  token = auth.token;

  notes = await fetchNotes();
});

describe("get notes", () => {
  test("all notes are returned", () => {
    assert.strictEqual(notes.length, initialNotes.length - 1); // initialNotes.length - 1, since only 2 notes belong to logged in user atm
  });

  test("returns 404 if note doesn't exist", async () => {
    const nonexistentNoteId = new mongoose.Types.ObjectId();
    await api
      .get(`/api/notes/${nonexistentNoteId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("returned note details are correct", () => {
    const noteTitles = notes.map((note) => note.title);
    assert(noteTitles.includes(initialNotes[0].title));
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

    const user2Token = loginRes.body.token;

    const res = await api
      .get("/api/notes")
      .set("Authorization", `Bearer ${user2Token}`)
      .expect(200);

    assert.strictEqual(res.body.length, 1);
    assert.strictEqual(res.body[0].user.id, newUser._id.toString());
  });
});

describe("post note", () => {
  const testNote = {
    title: "testNote",
    description: "testNote",
    deadlineDate: "2025-05-30T22:00:00",
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
      { ...testNote, deadlineDate: null },
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
    };

    const putRes = await api
      .put(`/api/notes/${noteToUpdate.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedNoteData)
      .expect(200);

    assert.strictEqual(putRes.body.title, updatedNoteData.title);
    assert.strictEqual(putRes.body.id, noteToUpdate.id);

    const updatedNotes = await fetchNotes();
    const updatedNote = updatedNotes.find(
      (note: Note) => note.id === noteToUpdate.id,
    );

    assert.ok(updatedNote);
    assert.strictEqual(updatedNote.title, updatedNoteData.title);
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

  test("returns 400 bar request with invalid data", async () => {
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
