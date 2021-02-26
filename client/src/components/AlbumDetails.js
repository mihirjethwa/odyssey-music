import React, { useEffect, useState } from "react";
import service from "../services/service";
import { useParams, Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { getSingleSong } from "../actions/songsAction";
import { usePalette } from "react-palette";
//import { useColor } from "color-thief-react";
//import Color from "color-thief-react";

const AlbumDetails = () => {
  const [album, setData] = useState([]);
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState("");
  // const [color, setColor] = useState("#fff");

  const { data } = usePalette(album.albumImage);
  const background = "linear-gradient(180deg," + data?.vibrant + ",#1F1F1F)";
  //const code = "1px 1px 30px 3px " + color;
  const singleSongData = useSelector((state) => state.songs.singleSongData);
  const loader = useSelector((state) => state.loader.loader);

  let { albumId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    service.getData("album/" + albumId, isSuccess, isError);
    service.getData("song/album/" + albumId, isSuccessSongs, isErrorSongs);
  }, [albumId]);

  const isSuccess = (response) => {
    setData(response);
    // setColor(response.colorCode);
    document.title = "Odyssey - " + response.albumName;
  };

  const isError = (error) => {
    setError(error);
  };

  const isSuccessSongs = (response) => {
    setSongs(response);
  };

  const isErrorSongs = (error) => {
    setError(error);
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
        <div style={{ display: "flex", flexDirection: "row", paddingTop: 50, paddingLeft: 60, height: 350, background: data?.vibrant, backgroundImage: background }}>
          <div style={{ boxShadow: "0 4px 60px rgba(0,0,0,.5)", minHeight: 300, minWidth: 300, height: 300, width: 300, overflow: "hidden" }}>
            <img src={album.albumImage} alt='album' style={{ objectFit: "fit", height: 300, minHeight: 300, minWidth: 300, width: 300 }} />
          </div>
          <div style={{ paddingLeft: "6%", position: "relative", height: 300, width: "100%" }}>
            <h1>{album.albumName}</h1>

            <div style={{ marginBottom: 8 }}>
              <span>Artists : &nbsp;</span>
              {album?.artist?.map((val, index) => (
                <Link to={`/artist/${val._id}`} style={{ color: "#fff" }} className='song-details-hover'>
                  <span style={{ fontWeight: "bold" }}>
                    {index ? ", " : ""}
                    {val.artistName}
                  </span>
                </Link>
              ))}
            </div>
            {album.albumReleasedDate && (
              <div style={{ marginBottom: 8 }}>
                <span>Released : &nbsp;</span>
                <span style={{ fontWeight: "bold" }}>{album.albumReleasedDate}</span>
              </div>
            )}
            {album.genre && (
              <div style={{ marginBottom: 8 }}>
                <span>Genre : &nbsp;</span>
                <span style={{ fontWeight: "bold" }}>{album.genre}</span>
              </div>
            )}
            {album.duration && (
              <div style={{ marginBottom: 8 }}>
                <span>Duration : &nbsp;</span>
                <span style={{ fontWeight: "bold" }}>{album.duration}</span>
              </div>
            )}
            {album.language && (
              <div style={{ marginBottom: 8 }}>
                <span>Language : &nbsp;</span>
                <span style={{ fontWeight: "bold" }}>{album.albumLanguage.language}</span>
              </div>
            )}
            {album && (
              <div style={{ marginBottom: 8 }}>
                <span>No. of Songs Available : &nbsp;</span>
                <span style={{ fontWeight: "bold" }}>{songs.length}</span>
              </div>
            )}
            {album.copyright && (
              <div style={{ marginBottom: 4, position: "absolute", bottom: 0 }}>
                <span style={{ fontWeight: "normal", fontSize: 14 }}>&copy; {album.copyright}</span>
              </div>
            )}
          </div>
        </div>
        <div style={{ padding: "1% 4%" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", transition: "all .2s ease" }}>
            <tr style={{ marginBottom: 100, backgroundColor: data.vibrant }}>
              <th style={{ textAlign: "center", padding: "12px", width: "5%" }}>#</th>
              <th style={{ textAlign: "left", padding: "12px" }}>Title</th>
              <th style={{ textAlign: "end", padding: "12px", width: "4%" }}>Duration</th>
            </tr>
            {songs.map((val, index) => (
              <tr className='table-hover' onClick={() => setSong(val)} style={{ borderBottom: "1px solid rgb(255,255,255,0.1)" }}>
                <td style={{ textAlign: "center", padding: "8px" }}>{index + 1}</td>
                <td style={{ textAlign: "left", padding: "8px" }}>
                  <div>
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
                </td>
                <td style={{ textAlign: "center", padding: "8px" }}>{val.duration}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    );
  }
};

export default AlbumDetails;
