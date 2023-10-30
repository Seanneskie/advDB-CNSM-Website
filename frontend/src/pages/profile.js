import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header'; // Import your Header component here

const Profile = () => {

  const { id } = useParams(); // Access the 'id' parameter from the URL
  // Assuming you have an 'id' field in your student data
  const [studentData, setStudentData] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [classifications, setClassifications] = useState([]);
  const [courses, setCourses] = useState([]);


  useEffect(() => {
    // Fetch student data from your API
    fetch(`/api/student/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setStudentData(data);
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
      });
      fetch('/api/department')
      .then((response) => response.json())
      .then((data) => {
        setDepartments(data);
      })
      .catch((error) => {
        console.error('Error fetching departments:', error);
      });

    // Fetch classification data from your backend API
    fetch('/api/class')
      .then((response) => response.json())
      .then((data) => {
        setClassifications(data);
      })
      .catch((error) => {
        console.error('Error fetching classifications:', error);
      });

    // Fetch course data from your backend API
    fetch('/api/course')
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
    
    }, [id]);

  return (
    <div>
      <Header /> {/* Make sure to use your Header component here */}
      <div className="ProfileForm">
        <div className="profile-header">
          {/* <img src="your-image-url.jpg" alt="Profile Picture" /> */}
          <h2>{studentData?.first_name} {studentData?.middle_name}. {studentData?.last_name}</h2>
        </div>
        <hr />
        <div>
          {studentData && (
            <>
              <p>
                <strong>First Name:</strong> {studentData.first_name}
              </p>
              <p>
                <strong>Last Name:</strong> {studentData.last_name}
              </p>
              <p>
                <strong>Middle Name:</strong> {studentData.middle_name}
              </p>
              <p>
                <strong>Year Level:</strong> {studentData.year_level}
              </p>
              <p>
                <strong>Year Enrolled:</strong> {studentData.year_enrolled}
              </p>
              <p>
                <strong>Department:</strong> {departments.find((department) => department._id === studentData.department)?.name || "Unknown" }
              </p>
              <p>
                <strong>Classification:</strong> {classifications.find((classification) => classification._id === studentData.classification)?.description || "Unknown" } 
              </p>
              <p>
                <strong>Course:</strong> {courses.find((course) => course._id === studentData.course)?.name || "Unknown"}
              </p>
              <p>
                <strong>Address:</strong> {studentData.address}
              </p>
              <p>
                <strong>Contact:</strong> {studentData.contact}
              </p>
              <p>
                <strong>Blood Type:</strong> {studentData.blood_type}
              </p>
              <p>
                <strong>Email:</strong> {studentData.email}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
