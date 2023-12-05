import React, { useState, useEffect } from 'react';

const ProposalForm = () => {
  const [formData, setFormData] = useState({
    proponent: '',// The selected student's ID
    start_date: '', 
    ETA: '',
    status: '',
    organization: '',
    agreed_votes: '',
    disagreed_votes:'',
  });

  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch the list of students from your backend API
    fetch('/api/student')
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
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
      // Make a POST request to your backend API to create an organization
      const response = await fetch('/api/org', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        // Handle successful organization creation
        console.log('Proposal created successfully');
        window.location.reload(); // You can also redirect to another page
      } else {
        // Handle errors, e.g., validation errors or server issues
        console.error('Error creating proposal');
      }
    } catch (error) {
      console.error('Error creating proposal:', error);
    }
  };

  return (
    <div className="org-form">
      <h2>Create Proposal</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Proposal Name"
          className="input-field"
        />
        <select
          name="head"
          value={formData.head}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">Select Head (Student)</option>
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.first_name + " " + student.last_name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="organization"
          value={formData.organization}
          onChange={handleChange}
          placeholder="Organization"
          className="input-field"
        />
        <button type="submit" className="submit-button">
          Create Proposal
        </button>
      </form>
    </div>
  );
};

export default ProposalForm;
