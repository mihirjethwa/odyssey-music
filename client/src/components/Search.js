import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Search.css";
import { Hint } from "react-autocomplete-hint";
import service from "../services/service";
import Loader from "react-loader-spinner";
import axios from "axios";
import { getSingleSong } from "../actions/songsAction";
import { useHistory } from "react-router-dom";
import { setSearchDataRedux, setSearchTextRedux } from "../actions/searchAction";
import SearchIcon from "@material-ui/icons/Search";

function Search() {
  const searchDataRedux = useSelector((state) => state.search.searchData);
  const searchText = useSelector((state) => state.search.text);

  const [text, setText] = useState(searchText);
  const [suggest, setSuggest] = useState([]);
  const [error, setError] = useState("");
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchData, setSearchData] = useState(searchDataRedux);

  const loader = useSelector((state) => state.loader.loader);

  const dispatch = useDispatch();
  const history = useHistory();
  document.title = "Odyssey - Search";

  const setSong = (songdata) => {
    dispatch(getSingleSong(songdata));
  };

  useEffect(() => {
    service.getData("song/searchArray", isSuccess, isError);
  }, []);

  const isSuccess = (response) => {
    setSuggest(response);
  };

  const isError = (error) => {
    setError(error);
  };

  const formSubmit = () => {
    setSearchLoader(true);
    dispatch(setSearchTextRedux(text));
    axios
      .get(service.baseURL + "song/search/" + text, { headers: service.serviceHeader })
      .then((response) => {
        setSearchLoader(false);
        if (response.status === 200) {
          setSearchData(response.data);
          dispatch(setSearchDataRedux(response.data));
        }
      })
      .catch((error) => {
        setSearchLoader(false);
        isError(error);
      });
  };

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      formSubmit();
    }
  };

  const redirectAlbum = (albumId) => {
    history.push(`/album/${albumId}`);
  };

  const redirectArtist = (albumId) => {
    history.push(`/artist/${albumId}`);
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
        <div id='search' className='search-input-container'>
          <div className='input-wrapper'>
            <Hint options={suggest}>
              <input
                className='search-input'
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
                onKeyPress={handleKeypress}
                placeholder='Search'
              />
            </Hint>
            <button className='search-button' onClick={() => formSubmit()}>
              <span>
                <SearchIcon />
              </span>
            </button>
          </div>
        </div>
        <div className='Album'>
          {searchLoader ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90vh" }}>
              <Loader type='Audio' color='#64fcf2' height={100} width={100} />
            </div>
          ) : (
            <div>
              {searchData?.length === 0 ? (
                <></>
              ) : (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 20, color: "#64fcf2" }}>
                    <div>
                      <h1>Songs</h1>
                    </div>
                  </div>
                  {searchData?.songs?.length === 0 ? (
                    <p style={{ padding: 20 }}>Sorry, No results found</p>
                  ) : (
                    <div>
                      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start", padding: 20 }}>
                        {searchData?.songs?.map((val, key) => (
                          <div key={key} className='Songs-card' onClick={() => setSong(val)} style={{ minWidth: 220, margin: 10 }}>
                            <div className='Songs-image' style={{ width: 220 }}>
                              <img src={val.album?.albumImage ? val.album?.albumImage : val.songImageBig} alt='songImage' style={{ width: 220 }} />
                            </div>
                            <div className='Songs-bottom'>
                              <p className='Songs-name' style={{ fontWeight: 500 }}>
                                {val.songName}
                              </p>
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
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {searchData?.length === 0 ? (
                <></>
              ) : (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 20, color: "#64fcf2" }}>
                    <div>
                      <h1>Album</h1>
                    </div>
                  </div>
                  {searchData?.album?.length === 0 ? (
                    <p style={{ padding: 20 }}>Sorry, No results found</p>
                  ) : (
                    <div>
                      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start", padding: 20 }}>
                        {searchData?.album?.map((val, key) => (
                          <div key={key} className='Songs-card' onClick={() => redirectAlbum(val._id)} style={{ minWidth: 220, margin: 10 }}>
                            <div className='Songs-image' style={{ width: 220 }}>
                              <img src={val.albumImage} alt='songImage' style={{ width: 220 }} />
                            </div>
                            <div className='Songs-bottom'>
                              <p className='Songs-name' style={{ fontWeight: 500, maxWidth: 200, wordBreak: "break-word" }}>
                                {val.albumName}
                              </p>
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
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {searchData?.length === 0 ? (
                <></>
              ) : (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 20, color: "#64fcf2" }}>
                    <div>
                      <h1>Artist</h1>
                    </div>
                  </div>
                  {searchData?.artist?.length === 0 ? (
                    <p style={{ padding: 20 }}>Sorry,No results found</p>
                  ) : (
                    <div>
                      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start", padding: 20 }}>
                        {searchData?.artist?.map((val, key) => (
                          <div key={key} className='Songs-card' onClick={() => redirectArtist(val._id)} style={{ minWidth: 220, margin: 10 }}>
                            <div className='Songs-image' style={{ width: 220 }}>
                              <img src={val.artistImage} alt='songImage' style={{ width: 220 }} />
                            </div>
                            <div className='Songs-bottom' style={{ textAlign: "center", lineHeight: 2 }}>
                              <p className='Songs-name' style={{ fontWeight: 500 }}>
                                {val.artistName}
                              </p>
                              {/* <div className="Songs-artist">{val.artist?.slice(0,4).map((val, index)=> <span>{(index ? ', ' : '')}{val.artistName}</span>)}</div> */}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
