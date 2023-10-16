import React, { useState, useEffect } from 'react';

const ClassList = () => {
  const [classifications, setClassifications] = useState([]);
  const [editClassification, setEditClassification] = useState(null);
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    // Fetch classification data from your backend API
    fetch('/api/class')
      .then((response) => response.json())
      .then((data) => {
        setClassifications(data);
      })
      .catch((error) => {
        console.error('Error fetching classifications:', error);
      });
    // Fetch organization data
      fetch('/api/org')
      .then((response) => response.json())
      .then((data) => {
        setOrganizations(data);
      })
      .catch((error) => {
        console.error('Error fetching organizations:', error);
      });
  }, []);

  const handleEdit = async (classificationId) => {
    // Fetch classification data based on ID for editing
    try {
      const response = await fetch(`/api/class/${classificationId}`);
      if (response.status === 200) {
        const classificationData = await response.json();
        setEditClassification(classificationData);
      } else {
        console.error('Error fetching classification for editing:', response.status);
      }
    } catch (error) {
      console.error('Error fetching classification for editing:', error);
    }
  };

  const handleUpdate = async () => {
    if (editClassification) {
      try {
        const response = await fetch(`/api/class/${editClassification._id}`, {
          method: 'PATCH', // Use PUT or PATCH as appropriate
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editClassification),
        });

        if (response.status === 200) {
          // Update the local state with the edited classification
          setClassifications((prevState) =>
            prevState.map((classification) =>
              classification._id === editClassification._id ? editClassification : classification
            )
          );
          // Clear the editClassification state
          setEditClassification(null);
        } else {
          console.error('Error updating classification:', response.status);
        }
      } catch (error) {
        console.error('Error updating classification:', error);
      }
    }
  };

  const handleDelete = async (classificationId) => {
    // Implement the delete action, e.g., show a confirmation dialog and delete the classification
    console.log(`Delete classification with ID: ${classificationId}`);
    try {
      const response = await fetch(`/api/class/${classificationId}`, {
        method: 'DELETE',
      });

      if (response.status === 204) {
        // Classification was successfully deleted
        // You can also remove the classification from the local state
        setClassifications(classifications.filter((classification) => classification._id !== classificationId));
      } else {
        const data = await response.json();
        console.error('Error deleting classification:', data.error);
        // Handle the error or display an error message
      }
    } catch (error) {
      console.error('Error deleting classification:', error);
      // Handle network or other errors
    }
  };

  return (
    <div className="table-container">
      <h2>List of Classifications</h2>
      <table className="classification-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Organization</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classifications.map((classification) => (
            <tr key={classification._id}>
              <td>{classification.description}</td>
              <td> {organizations.find((org) => org._id === classification.org)?.name || 'Unknown'}</td> {/* Assuming "org" is a reference to an organization with a "name" field */}
              <td>
                <button onClick={() => handleEdit(classification._id)}>Edit</button>
                <button onClick={() => handleDelete(classification._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Classification Form */}
      {editClassification && (
        <div className="edit-classification-form">
          <h2>Edit Classification</h2>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              name="description"
              value={editClassification.description}
              onChange={(e) =>
                setEditClassification({ ...editClassification, description: e.target.value })
              }
              placeholder="Classification Description"
              className="input-field"
            />
            <select
              name="org"
              value={editClassification.org}
              onChange={(e) =>
                setEditClassification({ ...editClassification, org: e.target.value })
              }
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
              Update Classification
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ClassList;
