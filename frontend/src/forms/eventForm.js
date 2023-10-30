import React, { useState, useEffect } from 'react';

const EventForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    org: '', // You can initialize this with the selected organization's ID
    time_start: '',
    time_end: '',
    facilitator: '', // You can initialize this with the selected facilitator's ID
    description: '',
    location: '',
  });

  const [organizations, setOrganizations] = useState([]); // You need to fetch organizations
  const [students, setStudents] = useState([]); // You need to fetch students

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a POST request to your backend API to create the event
    fetch('/api/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response or redirect as needed
        console.log('Event created:', data);
      })
      .catch((error) => {
        console.error('Error creating event:', error);
      });
  };

  // Fetch organizations and students when the component mounts
  useEffect(() => {
    fetch('/api/org')
      .then((response) => response.json())
      .then((data) => {
        setOrganizations(data);
      })
      .catch((error) => {
        console.error('Error fetching organizations:', error);
      });
    fetch('/api/student')
        .then((response) => response.json())
        .then((data) => {
        setStudents(data);
    })
        .catch((error) => {
        console.error('Error fetching students:', error);
    });
    // Fetch organizations and students from your backend API and set them in state
    
  }, []);

  return (
    <div className="event-form-container">
        <h2>Create an Event</h2>
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Event Name"
            className="input-field"
        />
        <select
            name="org"
            value={formData.org}
            onChange={handleChange}
            className="select-field"
        >
            <option value="">Select an Organization</option>
            {organizations.map((org) => (
            <option key={org._id} value={org._id}>
                {org.name}
            </option>
            ))}
        </select>
        <input
            type="datetime-local"
            name="time_start"
            value={formData.time_start}
            onChange={handleChange}
            className="input-field"
        />
        <input
            type="datetime-local"
            name="time_end"
            value={formData.time_end}
            onChange={handleChange}
            className="input-field"
        />
        <select
            name="facilitator"
            value={formData.facilitator}
            onChange={handleChange}
            className="select-field"
        >
            <option value="">Select a Facilitator</option>
            {students.map((student) => (
            <option key={student._id} value={student._id}>
                {student.first_name + ' ' + student.last_name}
            </option>
            ))}
        </select>
        <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Event Description"
            className="input-field"
        />
        <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Event Location"
            className="input-field"
        />
        <button type="submit" className="submit-button">
            Create Event
        </button>
        </form>
    </div>
  );
};

export default EventForm;
