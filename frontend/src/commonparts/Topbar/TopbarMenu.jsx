import React, { useState } from "react";
import { Link } from "react-router-dom";
import AccountCircleMenu from "./AccountCircleMenu";
import SearchIcon from '@mui/icons-material/Search';
import "./css/Topbar.css"
import NotificationsIconMenu from "./NotificationsIconMenu";

const TopbarMenu = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Perform search operation
  };

  return (
    <nav className="topbar-menu">
      <ul>
        <li className="Dashboard">
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
      <div className="Searchbar">
      <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
         <SearchIcon /> 
        </form>
        
     </div>
      <div className="topbar-right">
        <NotificationsIconMenu />
        <AccountCircleMenu />
        </div>
    </nav>
  );
};

export default TopbarMenu;
