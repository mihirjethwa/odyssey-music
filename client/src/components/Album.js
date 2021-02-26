import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import service from "../services/service";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import "./Album.css";

function Album() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState("latest");

  const loader = useSelector((state) => state.loader.loader);

  const history = useHistory();

  useEffect(() => {
    service.getData("album/albumall", isSuccess, isError);
    document.title = "Odyssey - Albums";
  }, []);

  const isSuccess = (response) => {
    const result = response.sort(function (a, b) {
      return new Date(b.albumDate) - new Date(a.albumDate);
    });
    setData(result);
  };

  const isError = (error) => {
    setError(error);
  };

  const selectedChange = (e) => {
    switch (e.target.value) {
      case "a-z":
        const compareAToZ = (a, b) => {
          if (a.albumName < b.albumName) {
            return -1;
          }
          if (a.albumName > b.albumName) {
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
          if (a.albumName > b.albumName) {
            return -1;
          }
          if (a.albumName > b.albumName) {
            return 1;
          }
          return 0;
        };
        const result2 = data.sort(compareZToA);
        setSelected("z-a");
        setData(result2);
        break;
      case "latest":
        const result3 = data.sort(function (a, b) {
          return new Date(b.albumDate) - new Date(a.albumDate);
        });
        setSelected("latest");
        setData(result3);
        break;
      default:
        return;
    }
  };

  const redirectMain = (albumId) => {
    history.push(`/album/${albumId}`);
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 20, color: "#64fcf2" }}>
          <div>
            <h1>Albums</h1>
          </div>
          <div style={{ border: "1px solid #64fcf2", padding: 8, borderRadius: 6 }}>
            <label>Sort by : </label>
            <select
              style={{ backgroundColor: "#1F1F1F", border: "none", padding: 6, color: "#64fcf2", fontSize: 14 }}
              value={selected}
              onChange={(e) => {
                selectedChange(e);
              }}
            >
              <option value='latest'>Latest Uploaded</option>
              <option value='a-z'>Ascending (A-Z)</option>
              <option value='z-a'>Descending (Z-A)</option>
            </select>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", padding: 20 }}>
            {data?.map((val, key) => (
              <div key={key} className='Songs-card' onClick={() => redirectMain(val._id)} style={{ minWidth: 220, margin: 10 }}>
                <div className='Songs-image' style={{ width: 220 }}>
                  <img src={val.albumImage} alt='songImage' style={{ width: 220 }} />
                </div>
                <div className='Songs-bottom'>
                  <p className='Songs-name' style={{ fontWeight: 500, maxWidth: 200 }}>
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
      </div>
    );
  }
}

export default Album;
