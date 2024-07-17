import app from "@/app";

const request = require("supertest");

describe("GET /api/users", () => {
  it("should return a users message", async () => {
    const response = await request(app).get("/api/users");

    expect(response.status).toBe(200);
  });
});
