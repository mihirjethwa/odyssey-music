const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  language: {
    type: String,
    required: true,
  },
});

module.exports = Language = mongoose.model("language", ArtistSchema);
