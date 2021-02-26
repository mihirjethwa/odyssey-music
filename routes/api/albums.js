const express = require("express");
const Album = require("../../models/Album");
const router = express.Router();

//Request to get all the Albums from db
router.get("/albumall", (req, res) => {
  Album.find()
    .populate({ path: "artist" })
    .populate("albumLanguage")
    .exec(function (err, albums) {
      if (err) return handleError(err);
      res.json(albums);
    });
});

//Request to get a particular artist
router.get("/:single", async (req, res, next) => {
  try {
    const albumId = req.params.single;
    const album = await Album.findOne({ _id: albumId }).populate("artist").populate("albumLanguage");
    if (!album) throw createError.NotFound();
    res.json(album);
  } catch (error) {
    next(error);
  }
});

//Request to get Albums of particular singer
router.get("/artist/:artistId", (req, res) => {
  const artistId = req.params.artistId;
  Album.find({ artist: artistId }).exec((err, artistAlbum) => {
    if (err) return handleError(err);
    res.json(artistAlbum);
  });
});

router.get("/search/:query", (req, res) => {
  function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
  const regex = new RegExp(escapeRegex(req.params.query), "gi");
  Album.find({ albumName: regex })
    .populate({
      path: "artist",
    })
    .exec(function (err, results) {
      if (err) return handleError(err);
      res.json(results);
    });
});

module.exports = router;
