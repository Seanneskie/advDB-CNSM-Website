// Header.js

import React, { useState } from 'react';
import '../static/css/header.css';
import logo from '../static/images/OMANSS_LOGO.png'
import msulogo from '../static/images/MSU_GSC.png'
import Sidebar from '../components/sidebar';


function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
        
    const toggleSidebar = () => {
        console.log('Toggling sidebar');
        setIsSidebarOpen(!isSidebarOpen);
    };
    
  return (
    
    <header>
        
        <nav>
        <div className='header-container'>
            <div className='button-container'>
              <button onClick={toggleSidebar} className='toggle-button'>
                <div className='bar'></div>
                <div className='bar'></div>
                <div className='bar'></div>
              </button>
            </div>
            <img src={logo} alt="OmanssLogo" className="logo" />
            <div className='title-container'>
                <h1>MINDANAO STATE UNIVERSITY - GENERAL SANTOS CITY</h1>
                <h2>College of Natural Science and Mathematics</h2>
                <h2>Admin Dashboard</h2>
            </div>
            <img src={msulogo} alt="MSU Logo" className="msulogo" />
           
        </div>
        </nav>
      <Sidebar isVisible={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </header>
  );
}

export default Header;
