import supertest from "supertest";
import app, { server } from "../index";
import mongoose from "mongoose";
import { mockNotes, mockUser } from "./mockData";
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

  test("a specific note is within the returned notes", async () => {
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
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});
