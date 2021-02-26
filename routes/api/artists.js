const express = require("express");
const router = express.Router();
const Artist = require("../../models/Artist");
const createError = require("http-errors");

//Request to get all the Artist from db
router.get("/artistall", async (req, res, next) => {
  try {
    const artists = await Artist.find();
    res.json(artists);
  } catch (error) {
    next(error);
  }
});

//Request to get a particular Artist

// router.get('/:artistId', (req, res)=>{
//     const artistId= req.params.artistId
//     Artist
//     .findOne({_id: artistId})
//     .exec((err, singleArtist)=> {
//         if(err) return handleError(err);
//         res.json(singleArtist)
//     })
// })

router.get("/:artistId", async (req, res, next) => {
  try {
    const artistId = req.params.artistId;
    const artist = await Artist.findOne({ _id: artistId });
    if (!artist) throw createError.NotFound();
    res.json(artist);
  } catch (error) {
    next(error);
  }
});

//
// router.post('/addartist', (req, res)=>{
//     Artist.findOne({artistName: req.body.name})
//     .then(artist => {
//         if(artist){
//             return res.status(400).json({email: "already exist"})
//         }else {
//             const newArtist = new Artist({
//                 artistName: req.body.name,
//                 artistImage: req.body.image,
//                 artistAbout: req.body.about,
//                 country: req.body.country,
//             })

//             newArtist.save()
//             .then(artist => res.json(artist))
//             .catch(err => console.log(err))
//         }
//     })
// })

module.exports = router;
