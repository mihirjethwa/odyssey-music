const express = require("express");
//const bodyParser = require("body-parser");
const cors = require("cors");
const createError = require("http-errors");
const mongoose = require("mongoose");
const compression = require("compression");
const path = require("path");

const Artist = require("./routes/api/artists");
const Album = require("./routes/api/albums");
const Song = require("./routes/api/songs");
const Language = require("./routes/api/Language");

const app = express();
app.use(cors());
app.use(compression());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

//DB connection
const db = require("./config/keys").mongoURI;
//const { normalizeStyle } = require("admin-bro");

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

//root route
// app.get("/", async (req, res, next) => {
//   res.send("hello");
// });

//admin route
app.use("/admin", require("./admin"));

//api routes
app.use("/api/artist", Artist);
app.use("/api/album", Album);
app.use("/api/song", Song);
app.use("/api/language", Language);

//For error
app.use(async (req, res, next) => {
  // const error = new Error("Not found");
  // error.status = 404;
  // next(error)
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//Creating port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server sarted at  ${port}`));
