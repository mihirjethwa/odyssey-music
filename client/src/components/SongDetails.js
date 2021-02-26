import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Home.css";
import { usePalette } from "react-palette";

const SongDetails = () => {
  const song = useSelector((state) => state.songs.singleSongData);
  //const [color, setstate] = useState(song?.album?.colorCode !== undefined ? song?.album?.colorCode : song?.colorCode);
  const { data } = usePalette(song?.album?.albumImage ? song?.album.albumImage : song?.songImageBig);

  //const code = "1px 1px 30px 3px " + data.vibrant;
  const background = "linear-gradient(180deg," + data.vibrant + ",#1F1F1F)";
  document.title = "Odyssey - " + song.songName;

  if (song.length === 0) {
    return <Redirect to='/' />;
  } else {
    return (
      <div style={{ background: data.vibrant, height: 400, backgroundImage: background }}>
        <div style={{ display: "flex", flexDirection: "row", paddingTop: 50, paddingLeft: 60, height: 350 }}>
          <div style={{ boxShadow: "0 4px 60px rgba(0,0,0,.5)", height: 300, width: 300, minHeight: 300, minWidth: 300, overflow: "hidden" }}>
            <img src={song?.album?.albumImage ? song?.album.albumImage : song?.songImageBig} alt='song' style={{ objectFit: "fit", height: 300, width: 300 }} />
          </div>
          <div style={{ paddingLeft: 80, position: "relative", height: 300, width: "100%" }}>
            <h1>{song?.songName}</h1>
            {song.album && (
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                <span>Album : &nbsp;</span>
                <Link to={`/album/${song.album._id}`} style={{ color: "#fff" }} className='song-details-hover'>
                  <h2>{song?.album?.albumName}</h2>
                </Link>
              </div>
            )}

            <div style={{ marginBottom: 8 }}>
              <span>Artists : &nbsp;</span>
              {song?.artist?.map((val, index) => (
                <Link to={`/artist/${val._id}`} style={{ color: "#fff" }} className='song-details-hover'>
                  <span style={{ fontWeight: "bold" }}>
                    {index ? ", " : ""}
                    {val.artistName}
                  </span>
                </Link>
              ))}
            </div>
            {song.released && (
              <div style={{ marginBottom: 8 }}>
                <span>Released : &nbsp;</span>
                <span style={{ fontWeight: "bold" }}>{song.released}</span>
              </div>
            )}
            {song.genre && (
              <div style={{ marginBottom: 8 }}>
                <span>Genre : &nbsp;</span>
                <span style={{ fontWeight: "bold" }}>{song.genre}</span>
              </div>
            )}
            {song.duration && (
              <div style={{ marginBottom: 8 }}>
                <span>Duration : &nbsp;</span>
                <span style={{ fontWeight: "bold" }}>{song.duration}</span>
              </div>
            )}
            {song.language && (
              <div style={{ marginBottom: 8 }}>
                <span>Language : &nbsp;</span>
                <span style={{ fontWeight: "bold" }}>{song.songLanguage.language}</span>
              </div>
            )}
            <div style={{ marginBottom: 8 }}>
              <span>Song Play Counter : &nbsp;</span>
              <span style={{ fontWeight: "bold" }}>
                {song.viewCount} {song.viewCount > 1 ? "Plays" : "Play"}
              </span>
            </div>
            <div style={{ marginBottom: 4, position: "absolute", bottom: 0 }}>
              <span style={{ fontWeight: "normal" }}>&copy; {song.album?.copyright ? song.album?.copyright : song.copyright}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SongDetails;
