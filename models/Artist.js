const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  artistName: {
    type: String,
    required: true,
  },
  artistImage: {
    type: String,
    required: true,
  },
  artistBanner: {
    type: String,
  },
  artistAbout: {
    type: String,
  },
  genre: {
    type: String,
  },
  country: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
  },
  rank: {
    type: String,
  },
  instagramLink: {
    type: String,
  },
  facebookLink: {
    type: String,
  },
  twitterLink: {
    type: String,
  },
  wikiLink: {
    type: String,
  },
});

module.exports = Artist = mongoose.model("artist", ArtistSchema);
