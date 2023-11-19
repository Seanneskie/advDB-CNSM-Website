import React, { useState, useEffect } from 'react';
import BarChartEx from '../components/barchart';

function BarYearLevel() {
    const [studentData, setStudentData] = useState([]);
    useEffect(() => {
        // Fetch student data from your API
        fetch('/api/student')
          .then(response => response.json())
          .then(data => {
            console.log('Fetched data:', data); // Log the fetched data to the console
    
            // Organize data by year_level and count the number of unique students in each year_level
            const studentsByYearLevel = {};
      
            data.forEach(student => {
              const { year_level, student_id } = student;
              // Use student_id as a unique identifier
              if (!studentsByYearLevel[year_level]) {
                studentsByYearLevel[year_level] = {};
              }
      
              studentsByYearLevel[year_level][student_id] = true;
            });
      
            // Count the number of unique students for each year_level
            const countByYearLevel = {};
            Object.keys(studentsByYearLevel).forEach(yearLevel => {
              countByYearLevel[yearLevel] = Object.keys(studentsByYearLevel[yearLevel]).length;
            });
      
            // Convert data to the format expected by BarChartEx component
            const formattedData = Object.keys(countByYearLevel).map(yearLevel => ({
              category: yearLevel,
              count: countByYearLevel[yearLevel],
            }));
      
            // Set the formatted data to the studentData state
            setStudentData(formattedData);
          })
          .catch(error => console.error('Error fetching student data:', error));
      }, []); // Empty dependency array ensures that the effect runs only once on mount
      
    return(
        <div>
            <h2>Number of Students by Year Level</h2>
            <BarChartEx data={studentData} />
        </div>

    );
}

export default BarYearLevel;