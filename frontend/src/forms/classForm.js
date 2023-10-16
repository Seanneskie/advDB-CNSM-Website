import React, { useState, useEffect } from 'react';

const ClassForm = () => {
  const [formData, setFormData] = useState({
    description: '',
    org: '', // Assuming this is the organization ID
  });

  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    // Fetch organization data from your backend API
    fetch('/api/org')
      .then((response) => response.json())
      .then((data) => {
        setOrganizations(data);
      })
      .catch((error) => {
        console.error('Error fetching organizations:', error);
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
      // Make a POST request to your backend API to create a classification
      const response = await fetch('/api/class', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        // Handle successful classification creation
        console.log('Classification created successfully');
        window.location.reload();
      } else {
        // Handle errors, e.g., validation errors or server issues
        console.error('Error creating classification');
      }
    } catch (error) {
      console.error('Error creating classification:', error);
    }
  };

  return (
    <div className="class-form">
      <h2>Create a Classification</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Classification Description"
          className="input-field"
        />
        <select
          name="org"
          value={formData.org}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">Select Organization</option>
          {organizations.map((organization) => (
            <option key={organization._id} value={organization._id}>
              {organization.name}
            </option>
          ))}
        </select>
        <button type="submit" className="submit-button">
          Create Classification
        </button>
      </form>
    </div>
  );
};

export default ClassForm;
