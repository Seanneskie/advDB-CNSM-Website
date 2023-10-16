import React, { useState, useEffect } from 'react';

const StudentForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    middle_name: '',
    year_level: '',
    year_enrolled: '',
    department: '',
    classification: '',
    course: '',
    address: '',
    contact: '',
    blood_type: '',
    email: '',
  });

  const [departments, setDepartments] = useState([]);
  const [classifications, setClassifications] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch department data from your backend API
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
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your backend API to create a student
      const response = await fetch('/api/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        // Handle successful student creation
        console.log('Student created successfully');
        window.location.reload();
      } else {
        // Handle errors, e.g., validation errors or server issues
        console.error('Error creating student');
      }
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  return (
    <div className="student-form">
      <h2>Create a Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
          className="input-field"
        />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Last Name"
          className="input-field"
        />
        <input
          type="text"
          name="middle_name"
          value={formData.middle_name}
          onChange={handleChange}
          placeholder="Middle Name"
          className="input-field"
        />
        <input
          type="text"
          name="year_level"
          value={formData.year_level}
          onChange={handleChange}
          placeholder="Year Level"
          className="input-field"
        />
        <input
          type="text"
          name="year_enrolled"
          value={formData.year_enrolled}
          onChange={handleChange}
          placeholder="Year Enrolled"
          className="input-field"
        />
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">Select Department</option>
          {departments.map((department) => (
            <option key={department._id} value={department._id}>
              {department.name}
            </option>
          ))}
        </select>
        <select
          name="classification"
          value={formData.classification}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">Select Classification</option>
          {classifications.map((classification) => (
            <option key={classification._id} value={classification._id}>
              {classification.description}
            </option>
          ))}
        </select>
        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="input-field"
        />
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Contact"
          className="input-field"
        />
        <input
          type="text"
          name="blood_type"
          value={formData.blood_type}
          onChange={handleChange}
          placeholder="Blood Type"
          className="input-field"
        />
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="input-field"
        />
        <button type="submit" className="submit-button">
          Create Student
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
