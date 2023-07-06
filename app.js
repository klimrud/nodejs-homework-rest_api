const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

// require("dotenv").config();
dotenv.config();

const usersRouter = require("./routes/users");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
// ====================

// const nodemailer = require("nodemailer");

// const { UKR_NET_EMAIL, UKRNET_PASSWORD } = process.env;

// const nodemailerConfig = {
//   host: "smtp.ukr.net",
//   port: 465,
//   secure: true,
//   auth: {
//     user: UKR_NET_EMAIL,
//     pass: UKRNET_PASSWORD,
//   },
// };

// const transport = nodemailer.createTransport(nodemailerConfig);

// const email = {
//   to: "mifohaj976@eimatro.com",
//   from: UKR_NET_EMAIL,
//   subject: "Test email",
//   html: "<p><strong> !Test email! </strong>from localhost:3000</p>",
// };

// transport
//   .sendMail(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log("error", error.message));
// =====================
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
