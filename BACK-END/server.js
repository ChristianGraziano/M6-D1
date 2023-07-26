const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 5050;

require("dotenv").config();

//Routes
const authorRoutes = require("./routes/authors");
const postRoutes = require("./routes/posts");
const resourceRoutes = require("./routes/resources");
const loginRoute = require("./routes/login");
const commentsRoute = require("./routes/comments");

//middlewares
const app = express();
app.use(express.json());

app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/", authorRoutes);
app.use("/", postRoutes);
app.use("/", resourceRoutes);
app.use("/", loginRoute);
app.use("/", commentsRoute);

mongoose.connect(process.env.MONGO_DB_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Errore di connessione al server!"));
db.once("open", () => console.log("Database MongoDB Connesso!"));

app.listen(PORT, () =>
  console.log(`server avviato ed in ascolto sulla porta ${PORT}`)
);
