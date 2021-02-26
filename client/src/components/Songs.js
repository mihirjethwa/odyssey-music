import React, { useEffect, useState } from "react";
import service from "../services/service";
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { getSingleSong } from "../actions/songsAction";

const Songs = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState("views");

  const singleSongData = useSelector((state) => state.songs.singleSongData);
  const loader = useSelector((state) => state.loader.loader);

  const dispatch = useDispatch();

  useEffect(() => {
    const isSuccess = (response) => {
      // const result =  response.sort(function(a,b){return new Date(b.albumDate) - new Date(a.albumDate);});
      const result = response.sort(compareViews);
      setData(result);
    };

    const isError = (error) => {
      setError(error);
    };
    service.getData("song/songall", isSuccess, isError);
    document.title = "Odyssey - All Songs";
  }, []);

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

  const compareViews = (a, b) => {
    if (a.viewCount > b.viewCount) {
      return -1;
    }
    if (a.viewCount > b.viewCoumt) {
      return 1;
    }
    return 0;
  };

  const selectedChange = (e) => {
    switch (e.target.value) {
      case "a-z":
        const compareAToZ = (a, b) => {
          if (a.songName < b.songName) {
            return -1;
          }
          if (a.songName > b.songName) {
            return 1;
          }
          return 0;
        };
        const result1 = data.sort(compareAToZ);
        setSelected("a-z");
        setData(result1);
        break;
      case "z-a":
        const compareZToA = (a, b) => {
          if (a.songName > b.songName) {
            return -1;
          }
          if (a.songName > b.songName) {
            return 1;
          }
          return 0;
        };
        const result2 = data.sort(compareZToA);
        setSelected("z-a");
        setData(result2);
        break;
      case "random":
        const result3 = shuffle(data);
        setSelected("random");
        setData(result3);
        break;
      case "views":
        const result4 = data.sort(compareViews);
        setSelected("views");
        setData(result4);
        break;
      default:
        return;
    }
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
      <div className='Album'>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 20,
            color: "#64fcf2",
          }}
        >
          <div>
            <h1>All Songs</h1>
          </div>
          <div
            style={{
              border: "1px solid #64fcf2",
              padding: 8,
              borderRadius: 6,
            }}
          >
            <label>Sort by : </label>
            <select
              style={{
                backgroundColor: "#1F1F1F",
                border: "none",
                padding: 6,
                color: "#64fcf2",
                fontSize: 14,
              }}
              value={selected}
              onChange={(e) => {
                selectedChange(e);
              }}
            >
              <option value='random'>Random</option>
              <option value='views'>Views</option>
              <option value='a-z'>Ascending (A-Z)</option>
              <option value='z-a'>Descending (Z-A)</option>
            </select>
          </div>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              padding: 20,
            }}
          >
            {data?.map((val, key) => (
              <div
                key={key}
                className='Songs-card'
                onClick={() => setSong(val)}
                style={{
                  minWidth: 220,
                  maxWidth: 220,
                  margin: 10,
                }}
              >
                <div className='Songs-image' style={{ width: 220 }}>
                  <img src={val.album?.albumImage ? val.album.albumImage : val.songImageBig} alt='songImage' style={{ width: 220 }} />
                </div>
                <div className='Songs-bottom'>
                  <p className='Songs-name' style={{ fontWeight: 500, wordBreak: "break-word" }}>
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
      </div>
    );
  }
};

export default Songs;
