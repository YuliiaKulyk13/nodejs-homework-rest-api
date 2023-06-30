const express = require("express");
const logger = require("morgan");
const cors = require("cors");

// const nodemailer = require("nodemailer");

// const { META_PASSWORD } = process.env;

// const nodemailerConfig = {
//   host: "smtp.meta.ua",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "yuliiakulyk13@meta.ua",
//     pass: META_PASSWORD,
//   },
// };

// const transport = nodemailer.createTransport(nodemailerConfig);

// const email = {
//   to: "starodubets.yuliia@gmail.com",
//   from: "yuliiakulyk13@meta.ua ",
//   subject: "Test email",
//   html: "<p><strong>Test email</strong>from localhost:3000</p>",
// };

// transport
//   .sendMail(email)
//   .then(() => console.log("Email send successful"))
//   .then((error) => console.log(error.message));

require("dotenv").config();

const usersRouter = require("./routes/api/users");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
