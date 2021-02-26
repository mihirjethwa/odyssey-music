const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  songName: {
    type: String,
    required: true,
  },
  artist: [
    {
      type: Schema.Types.ObjectId,
      ref: "artist",
    },
  ],
  album: {
    type: Schema.Types.ObjectId,
    ref: "album",
  },
  songLanguage: {
    type: Schema.Types.ObjectId,
    ref: "language",
  },
  songImageSmall: {
    type: String,
  },
  songImageBig: {
    type: String,
  },
  songLink1: {
    type: String,
    require: true,
  },
  songLink2: {
    type: String,
    require: true,
  },
  explicit: {
    type: Boolean,
    default: false,
  },
  genre: {
    type: String,
  },
  released: {
    type: String,
  },
  tags: {
    type: String,
  },
  language: {
    type: String,
  },
  duration: {
    type: String,
  },
  colorCode: {
    type: String,
  },
  copyright: {
    type: String,
  },
  lyrics: {
    type: String,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  songDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Song = mongoose.model("song", SongSchema);
