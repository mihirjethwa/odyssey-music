import { Link } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import AudioPlayer from "react-h5-audio-player";
import MicIcon from "@material-ui/icons/Mic";
import InfoIcon from "@material-ui/icons/Info";

import "./Footer.css";

function Footer() {
  const song = useSelector((state) => state.songs.singleSongData);
  const onPlay = () => {
    document.title = "Odyssey - " + song.songName + " ( " + song.artist[0].artistName + " )";
  };
  const onPause = () => {
    //document.title = "Odyssey - Web Player";
  };
  const onEnded = () => {
    //document.title = "Odyssey - Web Player";
  };
  return (
    <div className='Footer-container'>
      {/* left side===================================================================================================== */}
      <div className='Left-side'>
        {song.length !== 0 ? <img className='Song-image' src={song.album?.albumImage ? song.album.albumImage : song.songImageBig} alt='' /> : <div></div>}
        <div className='Song-info'>
          <div className='Song-name'>
            <p>{song?.songName}</p>
          </div>
          <div className='Song-artist'>
            <div className='Song-artist-names'>
              {song.explicit ? (
                <div className='Song-explicit'>
                  <span>E</span>
                </div>
              ) : (
                <div></div>
              )}
              <div id='artist-name'>
                <span>
                  {song.artist?.slice(0, 4).map((val, index) => (
                    <Link to={`/artist/${val._id}`} className='Song-artist-link'>
                      {index ? ", " : ""}
                      {val.artistName}
                    </Link>
                  ))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Center =================================================================================================== */}
      <div className='Center-side'>
        <AudioPlayer
          autoPlay
          layout='stacked-reverse'
          showDownloadProgress={true}
          // src="http://snoidcdnems08.cdnsrv.jio.com/jiosaavn.cdn.jio.com/677/5869c1087fbab5ce0b3b8ea0acdd2a01_160.mp4"
          src={song.songLink1}
          onPlay={(e) => onPlay()}
          onPause={(e) => onPause()}
          onEnded={(e) => onEnded()}
          // other props here
        />
      </div>
      {/* Right ==================================================================================================== */}
      <div className='Right-side'>
        {/* <div className='Lyrics'> */}
        {song._id ? (
          <div className='Lyrics'>
            <div className='Lyrics-align'>
              <Link to={"/lyrics"} className='Lyrics-icon'>
                <MicIcon />
                <p>Lyrics</p>
              </Link>
            </div>
            <div className='Lyrics-align'>
              <Link to={"/song-details"} className='Lyrics-icon'>
                <InfoIcon />
                <p>Details about song</p>
              </Link>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {/* </div> */}
        {/* <div className="Lyrics">
                    <div className='Lyrics-align'>
                        <Link to={'/lyrics'} className='Lyrics-icon'>
                        <MicIcon/>
                        <p>Lyrics</p>
                        </Link>
                    </div>
                    <div className='Lyrics-align'>
                        <Link to={'/song/:songId'} className="Lyrics-icon">
                        <InfoIcon/>
                        <p>Detail about song</p>
                        </Link>
                    </div>
                </div>     */}
      </div>
      {/* ======================================================================================================== */}
    </div>
  );
}

export default Footer;
