// Dashboard.js
import React, { useState, useEffect } from 'react';
import '../static/css/dashboard.css';
import '../static/css/card.css';
import Header from '../components/header';
import BarChartEx from '../components/barchart';
import Sidebar from '../components/sidebar';

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [studentData, setStudentData] = useState([]);

  const toggleSidebar = () => {
    console.log('Toggling sidebar');
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Fetch student data from your API
    fetch('/api/student')
      .then(response => response.json())
      .then(data => {
        // Organize data by year_level and count the number of students in each year_level
        const studentsByYearLevel = {};
  
        data.forEach(student => {
          const { year_level } = student;
          studentsByYearLevel[year_level] = (studentsByYearLevel[year_level] || 0) + 1;
        });
  
        // Convert data to the format expected by BarChartEx component
        const formattedData = Object.keys(studentsByYearLevel).map(yearLevel => ({
          yearLevel,
          count: studentsByYearLevel[yearLevel],
        }));
  
        // Set the formatted data to the studentData state
        setStudentData(formattedData);
      })
      .catch(error => console.error('Error fetching student data:', error));
  }, []); // Empty dependency array ensures that the effect runs only once on mount
  

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />
      <main className="main">
        <Sidebar isVisible={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className='main-content'>
          <h1>Number of Students by Course</h1>
          <BarChartEx data={studentData} />

        </div>
      </main>
    </div>
  );
}

export default Dashboard;
