import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [classifications, setClassifications] = useState([]);
  const [courses, setCourses] = useState([]);


  useEffect(() => {
    // Fetch student data from your backend API
    fetch('/api/student')
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
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
  }, []);

  const handleEdit = async (studentId) => {
    // Fetch student data based on ID for editing
    try {
      const response = await fetch(`/api/student/${studentId}`);
      if (response.status === 200) {
        const studentData = await response.json();
        setEditStudent(studentData);
      } else {
        console.error('Error fetching student for editing:', response.status);
      }
    } catch (error) {
      console.error('Error fetching student for editing:', error);
    }
  };

  const handleUpdate = async () => {
    if (editStudent) {
      try {
        const response = await fetch(`/api/student/${editStudent._id}`, {
          method: 'PATCH', // Use PUT or PATCH as appropriate
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editStudent),
        });

        if (response.status === 200) {
          // Update the local state with the edited student
          setStudents((prevState) =>
            prevState.map((student) =>
              student._id === editStudent._id ? editStudent : student
            )
          );
          // Clear the editStudent state
          setEditStudent(null);
        } else {
          console.error('Error updating student:', response.status);
        }
      } catch (error) {
        console.error('Error updating student:', error);
      }
    }
  };

  const handleDelete = async (studentId) => {
    // Implement the delete action, e.g., show a confirmation dialog and delete the student
    console.log(`Delete student with ID: ${studentId}`);
    try {
      const response = await fetch(`/api/student/${studentId}`, {
        method: 'DELETE',
      });

      if (response.status === 204) {
        // Student was successfully deleted
        // You can also remove the student from the local state
        setStudents(students.filter((student) => student._id !== studentId));
      } else {
        const data = await response.json();
        console.error('Error deleting student:', data.error);
        // Handle the error or display an error message
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      // Handle network or other errors
    }
  };

  return (
    <div className="table-container">
      <h2>List of Students</h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Year Level</th>
            <th>Department</th>
            <th>Classification</th>
            <th>Course</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Blood Type</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>{student.year_level}</td>
              <td>{departments.find((department) => department._id === student.department)?.name || "Unknown" }</td> {/* Assuming "department" is a reference to a department with a "name" field */}
              <td>{classifications.find((classification) => classification._id === student.classification)?.description || "Unknown" } </td> {/* Assuming "classification" has a "description" field */}
              <td>{courses.find((course) => course._id === student.course)?.name || "Unknown"}</td> {/* Assuming "course" is a reference to a course with a "name" field */}
              <td>{student.contact}</td>
              <td>{student.blood_type}</td>
              <td>{student.email}</td>
              <td>
                <button onClick={() => handleEdit(student._id)}>Edit</button>
                <button onClick={() => handleDelete(student._id)}>Delete</button>
                <button><Link to={`/profile/${student._id}`} className="link-profile">Profile</Link></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Student Form */}
      {editStudent && (
        <div className="edit-student-form">
          <h2>Edit Student</h2>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              name="first_name"
              value={editStudent.first_name}
              onChange={(e) =>
                setEditStudent({ ...editStudent, first_name: e.target.value })
              }
              placeholder="First Name"
              className="input-field"
            />
            <input
              type="text"
              name="last_name"
              value={editStudent.last_name}
              onChange={(e) =>
                setEditStudent({ ...editStudent, last_name: e.target.value })
              }
              placeholder="Last Name"
              className="input-field"
            />
            <input
              type="text"
              name="year_level"
              value={editStudent.year_level}
              onChange={(e) =>
                setEditStudent({ ...editStudent, year_level: e.target.value })
              }
              placeholder="Year Level"
              className="input-field"
            />
            <select
              name="department"
              value={editStudent.department}
              onChange={(e) =>
                setEditStudent({ ...editStudent, department: e.target.value })
              }
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
              value={editStudent.classification}
              onChange={(e) =>
                setEditStudent({ ...editStudent, classification: e.target.value })
              }
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
              value={editStudent.course}
              onChange={(e) =>
                setEditStudent({ ...editStudent, course: e.target.value })
              }
              className="input-field"
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </select>
            {/* Input field for Contact */}
            <input
            type="text"
            name="contact"
            value={editStudent.contact}
            onChange={(e) =>
                setEditStudent({ ...editStudent, contact: e.target.value })
            }
            placeholder="Contact"
            className="input-field"
            />

            {/* Input field for Address */}
            <input
            type="text"
            name="address"
            value={editStudent.address}
            onChange={(e) =>
                setEditStudent({ ...editStudent, address: e.target.value })
            }
            placeholder="Address"
            className="input-field"
            />

            {/* Input field for Blood Type */}
            <input
            type="text"
            name="blood_type"
            value={editStudent.blood_type}
            onChange={(e) =>
                setEditStudent({ ...editStudent, blood_type: e.target.value })
            }
            placeholder="Blood Type"
            className="input-field"
            />

            {/* Input field for Email */}
            <input
            type="text"
            name="email"
            value={editStudent.email}
            onChange={(e) =>
                setEditStudent({ ...editStudent, email: e.target.value })
            }
            placeholder="Email"
            className="input-field"
            />

            <button type="submit" className="submit-button">
              Update Student
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default StudentList;
