import React from 'react';

import './Navbar.scss'

import hot from "../../pic/Likes.png"
import matches from "../../pic/Matches.png"
import messeges from "../../pic/Messeges.png"
import people from "../../pic/People.png"
import settings from "../../pic/Settings.png"

const Navbar = () => {
  return (  
      <div className="navbar-container">
        <ul>
          <li><img src={hot} alt="hot"/></li>
          <li><img src={matches} alt="matches"/></li>
          <li><img src={people} alt="people"/></li>
          <li><img src={messeges} alt="messeges"/></li>
          <li><img src={settings} alt="settings"/></li>
        </ul>
      </div>
   );
}
 
export default Navbar;