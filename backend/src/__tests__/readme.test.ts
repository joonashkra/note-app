import supertest from "supertest";
import app, { server } from "../index";
import mongoose from "mongoose";

const api = supertest(app);

describe("get readme", () => {
  it("should return readme", async () => {
    await api
      .get("/api/readme")
      .expect(200)
      .expect("Content-Type", "text/html; charset=utf-8");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});
