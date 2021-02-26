import React, { useEffect, useState } from "react";
import service from "../services/service";
import { useParams, Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { getSingleSong } from "../actions/songsAction";

const ArtistDetails = ({ props }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [songs, setSongs] = useState([]);

  const singleSongData = useSelector((state) => state.songs.singleSongData);
  const loader = useSelector((state) => state.loader.loader);

  let { artistId } = useParams();
  const back = "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.6)), url(" + data.artistBanner + ")";

  const dispatch = useDispatch();

  useEffect(() => {
    const isSuccess = (response) => {
      setData(response);
      document.title = "Odyssey - " + response.artistName;
    };

    const isError = (error) => {
      setError(error);
    };

    const isSuccessSongs = (response) => {
      setSongs(shuffle(response));
    };

    const isErrorSongs = (error) => {
      setError(error);
    };
    service.getData("artist/" + artistId, isSuccess, isError);
    service.getData("song/artist/" + artistId, isSuccessSongs, isErrorSongs);
  }, [artistId]);

  const shuffle = (array) => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

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
    console.log(error);
  };

  if (loader) {
    return (
      <div className='Loader'>
        <Loader type='Audio' color='#64fcf2' height={100} width={100} />
      </div>
    );
  } else if (error) {
    return (
      <div>
        <div className='Error-message'>Oooops, some error occurred!! Please try refreshing or try after some time.</div>
      </div>
    );
  } else {
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "row", paddingTop: 50, paddingLeft: 60, height: 300, backgroundImage: back, backgroundSize: "cover" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p style={{ fontSize: 80, fontWeight: "bold", color: "#fff", marginTop: 150, marginBottom: 10 }}>{data.artistName}</p>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", paddingTop: 50, paddingLeft: 60, paddingRight: 60 }}>
          <div style={{ minHeight: 200, minWidth: 200, overflow: "hidden" }}>
            <img src={data.artistImage} alt='artist' style={{ objectFit: "contain", width: 200, height: 200 }} />
          </div>
          <div style={{ marginLeft: 40, width: "100%" }}>
            <div style={{ marginBottom: 8 }}>
              <span>Country : </span>
              <span style={{ fontWeight: 700 }}>{data.country}</span>
            </div>
            <div style={{ marginBottom: 8 }}>
              <span>Genre : </span>
              <span style={{ fontWeight: 700 }}>{data.genre}</span>
            </div>
            <div>About : </div>
            <div style={{ width: "100%", wordBreak: "break-word" }} dangerouslySetInnerHTML={{ __html: data.artistAbout }}></div>
          </div>
        </div>
        <div style={{ padding: "1% 4%" }}>
          <h2 style={{ color: "#5EE7DE", lineHeight: 4 }}>Popular Songs from Artist</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", transition: "all .2s ease" }}>
            <tr style={{ marginBottom: 100, backgroundColor: "#5EE7DE", color: "#000" }}>
              {/* <th style={{textAlign: "center",padding: "12px", width :"5%"}}>#</th> */}
              <th style={{ textAlign: "left", padding: "12px" }}>Title</th>
              <th style={{ textAlign: "center", padding: "12px" }}>Album</th>
              <th style={{ textAlign: "end", padding: "12px", width: "4%" }}>Duration</th>
            </tr>
            {songs.map((val, index) => (
              <tr className='table-hover' onClick={() => setSong(val)} style={{ borderBottom: "1px solid rgb(255,255,255,0.1)" }}>
                {/* <td style={{textAlign: "center",padding: "8px"}}>{index + 1}</td> */}
                <td style={{ textAlign: "left", padding: "8px" }}>
                  <div style={{ display: "flex" }}>
                    <div>
                      <img style={{ width: 40, height: 40, minWidth: 40, minHeight: 40, borderRadius: 2 }} src={val.album?.albumImage ? val.album?.albumImage : val.songImageSmall} alt='img' />
                    </div>
                    <div style={{ marginLeft: 12 }}>
                      <p>{val.songName}</p>
                      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        {val.explicit ? (
                          <div className='Song-explicit'>
                            <span>E</span>
                          </div>
                        ) : (
                          <div></div>
                        )}
                        <div id='artist-name'>
                          <span>
                            {val.artist?.slice(0, 4).map((val, index) => (
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
                </td>
                <td style={{ textAlign: "center", padding: "8px" }}>{val.album.albumName}</td>
                <td style={{ textAlign: "center", padding: "8px" }}>{val.duration}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    );
  }
};

export default ArtistDetails;
