import React from "react";
import "./Sidebar.css";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import AlbumIcon from "@material-ui/icons/Album";
import FaceIcon from "@material-ui/icons/Face";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const checkActive = (match, location) => {
    if (!location) return false;
    const { pathname } = location;
    return pathname === "/";
  };
  return (
    <div className='Sidebar-container'>
      <div className='Sidebar-name'>
        <span className='Sidebar-heavy'>ODYSSEY</span>
        <span className='Sidebar-light'>Music</span>
      </div>
      <div className='Sidebar-menu'>
        <NavLink to={"/"} className='Sidebar-menu-item' isActive={checkActive} activeClassName='Sidebar-menu-active'>
          <span>
            <HomeIcon />
          </span>
          <p>Home</p>
        </NavLink>
        <NavLink to={"/search"} className='Sidebar-menu-item' activeClassName='Sidebar-menu-active'>
          <span>
            <SearchIcon />
          </span>
          <p>Search</p>
        </NavLink>
        <NavLink to={"/albums/"} className='Sidebar-menu-item' activeClassName='Sidebar-menu-active'>
          <span>
            <AlbumIcon />
          </span>
          <p>Albums</p>
        </NavLink>
        <NavLink to={"/artists"} className='Sidebar-menu-item' activeClassName='Sidebar-menu-active'>
          <span>
            <FaceIcon />
          </span>
          <p>Artists</p>
        </NavLink>
        <NavLink to={"/songs"} className='Sidebar-menu-item' activeClassName='Sidebar-menu-active'>
          <span>
            <LibraryMusicIcon />
          </span>
          <p>Songs</p>
        </NavLink>
        <hr className='Sidebar-hr' />
        <div className='Sidebar-about'>{/* <Link to={'/about'}>
                    <p>About</p>
                </Link>     */}</div>
      </div>
    </div>
  );
}

export default Sidebar;
