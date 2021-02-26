import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./Lyrics.css";

function Lyrics() {
  const song = useSelector((state) => state.songs.singleSongData);

  document.title = "Odyssey - Lyrics (" + song.songName + " )";

  if (song.length === 0) {
    return <Redirect to='/' />;
  } else {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className='Lyrics-container'>
          <div style={{ marginBottom: 20 }}>
            <h1 style={{ color: "#64fcf2" }}>{song.songName}</h1>
            {song?.artist?.map((val) => (
              <p style={{ color: "#64fcf2", fontWeight: "bold" }}>{val.artistName}</p>
            ))}
          </div>
          {song.lyrics ? <></> : <p>Sorry, lyrics may not be available!!</p>}
          <div dangerouslySetInnerHTML={{ __html: song.lyrics }}></div>
        </div>
      </div>
    );
  }
}

export default Lyrics;
