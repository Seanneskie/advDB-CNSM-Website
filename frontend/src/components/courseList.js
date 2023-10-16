import React, { useState, useEffect } from 'react';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [editCourse, setEditCourse] = useState(null);

  useEffect(() => {
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

  const handleEdit = async (courseId) => {
    // Fetch course data based on ID for editing
    try {
      const response = await fetch(`/api/course/${courseId}`);
      if (response.status === 200) {
        const courseData = await response.json();
        setEditCourse(courseData);
      } else {
        console.error('Error fetching course for editing:', response.status);
      }
    } catch (error) {
      console.error('Error fetching course for editing:', error);
    }
  };

  const handleUpdate = async () => {
    if (editCourse) {
      try {
        const response = await fetch(`/api/course/${editCourse._id}`, {
          method: 'PATCH', // Use PUT or PATCH as appropriate
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editCourse),
        });

        if (response.status === 200) {
          // Update the local state with the edited course
          setCourses((prevState) =>
            prevState.map((course) =>
              course._id === editCourse._id ? editCourse : course
            )
          );
          // Clear the editCourse state
          setEditCourse(null);
        } else {
          console.error('Error updating course:', response.status);
        }
      } catch (error) {
        console.error('Error updating course:', error);
      }
    }
  };

  const handleDelete = async (courseId) => {
    // Implement the delete action, e.g., show a confirmation dialog and delete the course
        console.log(`Delete course with ID: ${courseId}`);
        try {
            const response = await fetch(`/api/courses/${courseId}`, {
              method: 'DELETE',
            });
      
            if (response.status === 204) {
              // Course was successfully deleted
              // You can also remove the course from the local state
              setCourses(courses.filter((course) => course._id !== courseId));
            } else {
              const data = await response.json();
              console.error('Error deleting course:', data.error);
              // Handle the error or display an error message
            }
          } catch (error) {
            console.error('Error deleting course:', error);
            // Handle network or other errors
          }
    };

  return (
    <div className="table-container">
      <h2>List of Courses</h2>
      <table className="course-table">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Course Track</th>
            <th>Curriculum Review Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id}>
              <td>{course.name}</td>
              <td>{course.track}</td>
              <td>{course.curriculum_rv_date}</td>
              <td>{course.description}</td>
              <td>
                <button onClick={() => handleEdit(course._id)}>Edit</button>
                <button onClick={() => handleDelete(course._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Course Form */}
      {editCourse && (
        <div className="edit-course-form">
          <h2>Edit Course</h2>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              name="name"
              value={editCourse.name}
              onChange={(e) =>
                setEditCourse({ ...editCourse, name: e.target.value })
              }
              placeholder="Course Name"
              className="input-field"
            />
            <input
              type="text"
              name="track"
              value={editCourse.track}
              onChange={(e) =>
                setEditCourse({ ...editCourse, track: e.target.value })
              }
              placeholder="Course Track"
              className="input-field"
            />
            <input
              type="text"
              name="curriculum_rv_date"
              value={editCourse.curriculum_rv_date}
              onChange={(e) =>
                setEditCourse({ ...editCourse, curriculum_rv_date: e.target.value })
              }
              placeholder="Curriculum Review Date"
              className="input-field"
            />
            <input
              type="text"
              name="description"
              value={editCourse.description}
              onChange={(e) =>
                setEditCourse({ ...editCourse, description: e.target.value })
              }
              placeholder="Description"
              className="input-field"
            />
            <button type="submit" className="submit-button">
              Update Course
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CourseList;
