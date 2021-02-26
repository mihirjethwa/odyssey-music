import "./App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Switch, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Search from "./components/Search";
import Sidebar from "./components/Sidebar";
import Error404 from "./components/Error404";
import Home from "./components/Home";
import Lyrics from "./components/Lyrics";
import Album from "./components/Album";
import SongDetails from "./components/SongDetails";
import ArtistDetails from "./components/ArtistDetails";
import AlbumDetails from "./components/AlbumDetails";
import Artists from "./components/Artists";
import Songs from "./components/Songs";

function App() {
  return (
    <div className='App-container'>
      <div className='App-body'>
        <Sidebar />
        <div style={{ marginLeft: 254, marginBottom: 100, width: "100%" }}>
          <Switch>
            <Route path={"/"} exact component={Home} />
            <Route path={"/albums"} exact component={Album} />
            <Route path={"/search"} exact component={Search} />
            <Route path={"/lyrics"} exact component={Lyrics} />
            <Route path={"/song-details"} exact component={SongDetails} />
            <Route path={"/artist/:artistId"} exact component={ArtistDetails} />
            <Route path={"/album/:albumId"} exact component={AlbumDetails} />
            <Route path={"/artists"} exact component={Artists} />
            <Route path={"/songs"} exact component={Songs} />
            <Route path='*' exact={true} component={Error404} />
            {/* <Route path={"/about"} exact component={About} /> */}
          </Switch>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
