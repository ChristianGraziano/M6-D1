const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 5050;

require("dotenv").config();
const authorRoutes = require("./routes/authors");
const postRoutes = require("./routes/posts");

const app = express();
app.use(express.json());

app.use(cors());
app.use("/", authorRoutes);
app.use("/", postRoutes);

mongoose.connect(process.env.MONGO_DB_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Errore di connessione al server!"));
db.once("open", () => console.log("Database MongoDB Connesso!"));

app.listen(PORT, () =>
  console.log(`server avviato ed in ascolto sulla porta ${PORT}`)
);
