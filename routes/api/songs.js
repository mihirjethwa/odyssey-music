const express = require("express");
const router = express.Router();
const Song = require("../../models/Song");
const Album = require("../../models/Album");
const Artist = require("../../models/Artist");
const createError = require("http-errors");

//Request to get all the Song
router.get("/songall", async (req, res, next) => {
  try {
    const songs = await Song.find().populate("album", { _id: true, albumName: true, colorCode: true, albumImage: true, copyright: true }).populate("artist", { _id: true, artistName: true }).populate("songLanguage");
    res.json(songs);
  } catch (error) {
    next(error);
  }
});

//Request to get all song based on the album
router.get("/album/:albumId", async (req, res, next) => {
  try {
    const albumId = req.params.albumId;
    const songs = await Song.find({ album: albumId }).populate("album").populate("artist").populate("songLanguage");
    res.json(songs);
  } catch (error) {
    next(error);
  }
});

//Request to get all song based on the artist
router.get("/artist/:artistId", async (req, res, next) => {
  try {
    const artistId = req.params.artistId;
    const songs = await Song.find({ artist: artistId }).populate("album").populate("artist").populate("songLanguage");
    if (!songs) throw createError.NotFound();
    res.json(songs);
  } catch (error) {
    next(error);
  }
});

//Request to get all the song and put it into array for search autocomplete
router.get("/searchArray", async (req, res, next) => {
  try {
    const songs = await Song.find().distinct("songName");
    const album = await Album.find().distinct("albumName");
    const artist = await Artist.find().distinct("artistName");
    const array = songs.concat(album);
    const searchArray = array.concat(artist);
    res.json(searchArray);
  } catch (error) {
    next(error);
  }
});

//Requset to get all the songs based on search query
router.get("/search/:query", async (req, res, next) => {
  try {
    function escapeRegex(text) {
      return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }
    const regex = new RegExp(escapeRegex(req.params.query), "gi");
    const songs = await Song.find({ $or: [{ songName: regex }, { tags: regex }] })
      .populate("album")
      .populate("artist")
      .populate("songLanguage");
    const album = await Album.find({ $or: [{ albumName: regex }, { tags: regex }] })
      .populate("artist")
      .populate("albumLanguage");
    const artist = await Artist.find({ $or: [{ artistName: regex }, { tags: regex }] });
    res.json({ songs: songs, album: album, artist: artist });
  } catch (error) {
    next(error);
  }
});

//Request to update the views count on Song play
router.patch("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const song = await Song.findById(id);
    const update = { viewCount: song.viewCount + 1 };
    const option = { new: true };
    const result = await Song.findByIdAndUpdate(id, update, option).populate("album", { _id: true, albumName: true, colorCode: true, albumImage: true, copyright: true }).populate("artist", { _id: true, artistName: true }).populate("songLanguage");
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
