// Local / traditional hosting server. (On Vercel, api/contact.js runs by itself.)
require("dotenv").config();
const express = require("express");
const path = require("path");
const contact = require("./api/contact");

const app = express();
app.set("trust proxy", 1);
app.use(express.json({ limit: "20kb" }));

app.post("/api/contact", contact);

// Only the public/ folder is served, so .env and server code are never exposed.
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Portfolio running on http://localhost:${PORT}`),
);
