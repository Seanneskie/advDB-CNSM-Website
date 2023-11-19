import React, { useState, useEffect } from 'react';
import BarChartEx from '../components/barchart';

function BarCourse() {
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch student data from your API
        const response = await fetch('/api/student');
        const data = await response.json();

        console.log('Fetched data:', data); // Log the fetched data to the console

        // Organize data by course and count the number of unique students in each course
        const studentsByCourse = {};

        // Fetch course details for each student
        await Promise.all(
          data.map(async (student) => {
            const courseResponse = await fetch(`/api/course/${student.course}`);
            const courseData = await courseResponse.json();

            // Use student_id as a unique identifier
            const { student_id } = student;

            const courseName = courseData.name; // Assuming `name` is the property containing the course name

            if (!studentsByCourse[courseName]) {
              studentsByCourse[courseName] = {};
            }

            studentsByCourse[courseName][student_id] = {
              ...student,
              course: courseName,
            };
          })
        );

        // Count the number of unique students for each course
        const countByCourse = {};
        Object.keys(studentsByCourse).forEach((course) => {
          countByCourse[course] = Object.keys(studentsByCourse[course]).length;
        });

        // Convert data to the format expected by BarChartEx component
        const formattedData = Object.keys(countByCourse).map((course) => ({
          category: course,
          count: countByCourse[course],
        }));

        // Set the formatted data to the studentData state
        setStudentData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  return (
    <div>
      <h2>Number of Students by Course</h2>
      <BarChartEx data={studentData} />
    </div>
  );
}

export default BarCourse;
