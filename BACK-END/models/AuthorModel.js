const mongoose = require("mongoose");

const AuthorModelsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    birthdayDate: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, //mette data di modifica
    strict: true, // nessun campo differente dal payload
  }
);

module.exports = mongoose.model("Author", AuthorModelsSchema, "authors");
