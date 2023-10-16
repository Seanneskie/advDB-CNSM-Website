import React, { useState } from 'react';



const DepartmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    dept_head: '',
    dept_bldg: '',
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
      // Make a POST request to your backend API to create a department
      const response = await fetch('/api/department', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        // Handle successful department creation
        console.log('Department created successfully');
        window.location.reload();
      } else {
        // Handle errors, e.g., validation errors or server issues
        console.error('Error creating department');
      }
    } catch (error) {
      console.error('Error creating department:', error);
    }
  };

  return (
    <div>
        
        <div className="department-form">

            <h2>Create a Department</h2>
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Department Name"
                className="input-field"
            />
            <input
                type="text"
                name="dept_head"
                value={formData.dept_head}
                onChange={handleChange}
                placeholder="Department Head"
                className="input-field"
            />
            <input
                type="text"
                name="dept_bldg"
                value={formData.dept_bldg}
                onChange={handleChange}
                placeholder="Department Building"
                className="input-field"
            />
            <button type="submit" className="submit-button">Create Department</button>
            </form>
        </div>
    </div>
  );
};

export default DepartmentForm;
