import supertest from "supertest";
import app, { server } from "../index";
import mongoose from "mongoose";
import { mockNotes, mockUser, mockUser2 } from "./mockData";
import NoteModel from "../models/note";
import UserModel from "../models/user";
import assert from "node:assert";
import { Note } from "../types/notes";

const api = supertest(app);

const initialNotes = mockNotes;

let token: string;

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

  const res = await api
    .post("/api/login")
    .send({
      username: "TestUser",
      password: "TestUser",
    })
    .expect(200);

  token = res.body.auth.token;
});

describe("get notes", () => {
  test("notes are returned as json", async () => {
    await api
      .get("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all notes are returned", async () => {
    const res = await api
      .get("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    assert.strictEqual(res.body.length, initialNotes.length);
  });

  test("returned note details are correct", async () => {
    const res = await api
      .get("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    const noteTitles = res.body.map((note: Note) => note.title);
    assert(noteTitles.includes(initialNotes[0].title));
  });

  test("returns bad request without access token", async () => {
    await api.get("/api/notes").expect(401);
  });

  test("returns only notes that belog to logged in user", async () => {
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

    token = loginRes.body.auth.token;

    const res = await api
      .get("/api/notes")
      .set("Authorization", `Bearer ${token}`)
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

  test.only("works with valid token & data", async () => {
    let getRes = await api
      .get("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    const userInitialNotes = getRes.body.map((note: Note) => note);

    await api
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send(testNote)
      .expect(201);

    getRes = await api
      .get("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    const userNewNotes = getRes.body.map((note: Note) => note);

    assert.strictEqual(userNewNotes.length, userInitialNotes.length + 1);
  });

  test("returns 401 unauthorized without access token", async () => {
    await api.post("/api/notes").send(testNote).expect(401);
  });

  test.only("returns 400 bad request with invalid data", async () => {
    await api
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...testNote, title: null })
      .expect(400);

    await api
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...testNote, description: null })
      .expect(400);

    await api
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...testNote, deadlineDate: null })
      .expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});
