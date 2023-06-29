const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();
const { DB_HOST, PORT = 3000 } = process.env;

const app = require("../app");

beforeAll(async () => {
  await mongoose.connect(DB_HOST).then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /users/login", () => {
  test("Login user", async () => {
    const res = await request(app).post("/users/login").send({
      email: "example@example.com",
      password: "examplepassword",
    });

    expect(res.status).toBe(200);
    expect(typeof res.body === "object").toBe(true);
    expect(typeof res.body.user.email).toBe("string");
    expect(typeof res.body.user.subscription).toBe("string");
    expect(res.body.token).toBeTruthy();
  });
});
