import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs, getSingleSong } from "../actions/songsAction";
import Loader from "react-loader-spinner";
import "./Home.css";
import service from "../services/service";
import { fetchLanguage } from "../actions/languageAction";

function Home() {
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, [dispatch]);
  const songsList = useSelector((state) => state.songs.data);
  const songsError = useSelector((state) => state.songs.error);
  const singleSongData = useSelector((state) => state.songs.singleSongData);
  const loader = useSelector((state) => state.loader.loader);
  const language = useSelector((state) => state.language.language);
  const languageError = useSelector((state) => state.language.error);

  const [error, setError] = useState(false);

  // const getData = () => {
  //   dispatch(fetchSongs());
  //   dispatch(fetchLanguage());
  // };

  useEffect(() => {
    document.title = "Odyssey - Web Player";
    if (songsList.length === 0) {
      // getData();
      stableDispatch(fetchSongs());
      stableDispatch(fetchLanguage());
    }
  }, [stableDispatch, songsList]);

  const setSong = (songdata) => {
    if (songdata._id === singleSongData._id) {
      return;
    }
    service.updateData("song/" + songdata._id, setSingleSong, setSingleSongError);
  };

  const setSingleSong = (data) => {
    dispatch(getSingleSong(data));
  };

  const setSingleSongError = (error) => {
    setError(true);
  };

  if (loader) {
    return (
      <div className='Loader'>
        <Loader type='Audio' color='#64fcf2' height={100} width={100} />
      </div>
    );
  } else if (songsError || languageError || error) {
    return (
      <div>
        <div className='Error-message'>Oooops, some error occurred!! Please try refreshing or try after some time.</div>
      </div>
    );
  } else {
    return (
      <div className='Home'>
        {language.map((language) => (
          <div className='Songs-container'>
            <div className='Songs-Language'>
              <h2>{language} Songs</h2>
            </div>
            <div className='Songs-display'>
              {songsList
                .filter((res) => res?.songLanguage?.language === language)
                .slice(0, 40)
                .map((val) => (
                  <div className='Songs-card' onClick={() => setSong(val)} style={{ minWidth: 220 }}>
                    <div>
                      <div className='Songs-image' style={{ width: 220 }}>
                        <img src={val?.album?.albumImage ? val.album.albumImage : val.songImageBig} alt='songImage' style={{ width: 220 }} />
                      </div>
                      <div className='Songs-bottom'>
                        <p className='Songs-name'>{val?.songName}</p>
                        <div className='Songs-artist'>
                          {val.artist?.slice(0, 4).map((val, index) => (
                            <span>
                              {index ? ", " : ""}
                              {val.artistName}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Home;
