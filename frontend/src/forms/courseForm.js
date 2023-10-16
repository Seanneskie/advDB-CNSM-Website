import React, { useState } from 'react';

const CourseForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    track: '',
    curriculum_rv_date: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your backend API to create a course
      const response = await fetch('/api/course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        // Handle successful course creation
        console.log('Course created successfully');
        window.location.reload();
      } else {
        // Handle errors, e.g., validation errors or server issues
        console.error('Error creating course');
      }
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  return (
    <div class="course-form">
        <h2>Create a Course</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Course Name"
                className="input-field"
            />
            <input
                type="text"
                name="track"
                value={formData.track}
                onChange={handleChange}
                placeholder="Course Track"
                className="input-field"
            />
            <input
                type="text"
                name="curriculum_rv_date"
                value={formData.curriculum_rv_date}
                onChange={handleChange}
                placeholder="Curriculum Review Date"
                className="input-field"
            />
            <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="input-field"
            />
            <button type="submit" className="submit-button">Create Course</button>
        </form>
    </div>

  );
};

export default CourseForm;
