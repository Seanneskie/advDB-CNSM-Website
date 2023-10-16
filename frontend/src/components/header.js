// Header.js

import React from 'react';
import '../static/css/header.css';
import logo from '../static/images/OMANSS_LOGO.png'
import msulogo from '../static/images/MSU_GSC.png'

function Header() {
  return (
    <header>
        <nav>
        <div className='header-container'>
            <img src={logo} alt="OmanssLogo" className="logo" />
            <div className='title-container'>
                <h1>MINDANAO STATE UNIVERSITY - GENERAL SANTOS CITY</h1>
                <h2>College of Natural Science and Mathematics</h2>
                <h2>Admin Dashboard</h2>
            </div>
            <img src={msulogo} alt="MSU Logo" className="msulogo" />
           
        </div>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
        </ul>
        </nav>
    </header>
  );
}

export default Header;
