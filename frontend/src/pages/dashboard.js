// Dashboard.js
import React, { useState } from 'react';
import '../static/css/dashboard.css';
import '../static/css/card.css';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import BarYearLevel from '../charts/yearlevel';
import BarCourse from '../charts/course';

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    console.log('Toggling sidebar');
    setIsSidebarOpen(!isSidebarOpen);
  };

 

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />
      <main className="main">
        <Sidebar isVisible={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className='main-content'>
          <div className='graphs'>
            <BarYearLevel />
          </div>
        
          <div className='graphs'>
            <BarCourse />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
