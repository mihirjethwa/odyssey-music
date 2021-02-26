import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import service from "../services/service";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import "./Album.css";

function Artist() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState("a-z");

  const loader = useSelector((state) => state.loader.loader);

  const history = useHistory();

  document.title = "Odyssey - Artists";

  const compareAToZ = (a, b) => {
    if (a.artistName < b.artistName) {
      return -1;
    }
    if (a.artistName > b.artistName) {
      return 1;
    }
    return 0;
  };

  useEffect(() => {
    const isSuccess = (response) => {
      const result = response.sort(compareAToZ);
      setData(result);
    };

    const isError = (error) => {
      setError(error);
    };
    service.getData("artist/artistall", isSuccess, isError);
  }, []);

  const selectedChange = (e) => {
    switch (e.target.value) {
      case "a-z":
        const result1 = data.sort(compareAToZ);
        setSelected("a-z");
        setData(result1);
        break;
      case "z-a":
        const compareZToA = (a, b) => {
          if (a.artistName > b.artistName) {
            return -1;
          }
          if (a.artistName > b.artistName) {
            return 1;
          }
          return 0;
        };
        const result2 = data.sort(compareZToA);
        setSelected("z-a");
        setData(result2);
        break;
      default:
        return;
    }
  };

  const redirectMain = (artistId) => {
    history.push(`/artist/${artistId}`);
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
            <h1>Artists</h1>
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
                  <img src={val.artistImage} alt='songImage' style={{ width: 220, objectFit: "cover" }} />
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
      </div>
    );
  }
}

export default Artist;
