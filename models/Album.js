const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  albumName: {
    type: String,
    required: true,
  },
  artist: [
    {
      type: Schema.Types.ObjectId,
      ref: "artist",
    },
  ],
  albumLanguage: {
    type: Schema.Types.ObjectId,
    ref: "language",
  },
  albumImage: {
    type: String,
    require: true,
  },
  copyright: {
    type: String,
  },
  label: {
    type: String,
  },
  tags: {
    type: String,
  },
  albumReleasedDate: {
    type: String,
  },
  genre: {
    type: String,
  },
  language: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
  },
  colorCode: {
    type: String,
  },
  albumDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Album = mongoose.model("album", AlbumSchema);
