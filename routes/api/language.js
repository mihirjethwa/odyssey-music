const express = require("express");
const router = express.Router();
const Language = require("../../models/Language");

router.get("/test", (req, res) => res.json({ msg: "artist worked" }));

//Request to get all the languages from db
router.get("/languageall", async (req, res, next) => {
  try {
    const language = await Language.find();
    res.json(language);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
