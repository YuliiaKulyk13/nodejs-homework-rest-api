const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();
const { DB_HOST, PORT = 3000 } = process.env;

const app = require("../app");

beforeEach(async () => {
  await mongoose.connect(DB_HOST).then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  });
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("POST /api/users/login", () => {
  test("Login user", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "example@example.com",
      password: "passwordexample123455$",
    });

    expect(res.status).toBe(200);
    expect(typeof res.body === "object").toBe(true);
    expect(typeof res.body.user.email).toBe("string");
    expect(typeof res.body.user.subscription).toBe("string");
    expect(res.body.token).toBeTruthy();
  });
});
