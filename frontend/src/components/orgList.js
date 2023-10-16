import React, { useState, useEffect } from 'react';

function OrgList() {
  const [organizations, setOrganizations] = useState([]);
  const [editOrganization, setEditOrganization] = useState(null);
  const [students, setStudents] = useState([]);


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

    fetch('/api/student')
        .then((response) => response.json())
        .then((data) => {
        setStudents(data);
        })
        .catch((error) => {
        console.error('Error fetching students:', error);
    });
  }, []);

  const handleEdit = async (organizationId) => {
    // Fetch organization data based on ID for editing
    try {
      const response = await fetch(`/api/org/${organizationId}`);
      if (response.status === 200) {
        const organizationData = await response.json();
        setEditOrganization(organizationData);
      } else {
        console.error('Error fetching organization for editing:', response.status);
      }
    } catch (error) {
      console.error('Error fetching organization for editing:', error);
    }
  };

  const handleUpdate = async () => {
    if (editOrganization) {
      try {
        const response = await fetch(`/api/org/${editOrganization._id}`, {
          method: 'PATCH', // Use PUT or PATCH as appropriate
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editOrganization),
        });

        if (response.status === 200) {
          // Update the local state with the edited organization
          setOrganizations((prevState) =>
            prevState.map((organization) =>
              organization._id === editOrganization._id ? editOrganization : organization
            )
          );
          // Clear the editOrganization state
          setEditOrganization(null);
        } else {
          console.error('Error updating organization:', response.status);
        }
      } catch (error) {
        console.error('Error updating organization:', error);
      }
    }
  };

  const handleDelete = async (organizationId) => {
    // Implement the delete action, e.g., show a confirmation dialog and delete the organization
    console.log(`Delete organization with ID: ${organizationId}`);
    try {
      const response = await fetch(`/api/org/${organizationId}`, {
        method: 'DELETE',
      });

      if (response.status === 204) {
        // Organization was successfully deleted
        // You can also remove the organization from the local state
        setOrganizations(organizations.filter((organization) => organization._id !== organizationId));
      } else {
        const data = await response.json();
        console.error('Error deleting organization:', data.error);
        // Handle the error or display an error message
      }
    } catch (error) {
      console.error('Error deleting organization:', error);
      // Handle network or other errors
    }
  };

  return (
    <div className="table-container">
      <h2>List of Organizations</h2>
      <table className="org-table">
        <thead>
          <tr>
            <th>Organization Name</th>
            <th>Head</th>
            <th>Organization Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {organizations.map((organization) => (
            <tr key={organization._id}>
              <td>{organization.name}</td>
              <td>{students.find((student) => student._id === organization.head)?.first_name + " "  +
              students.find((student) => student._id === organization.head)?.last_name || 'Unknown'} </td> {/* Assuming "head" is a reference to a student with a "name" field */}
              <td>{organization.org_location}</td>
              <td>
                <button onClick={() => handleEdit(organization._id)}>Edit</button>
                <button onClick={() => handleDelete(organization._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Organization Form */}
      {editOrganization && (
        <div className="edit-organization-form">
          <h2>Edit Organization</h2>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              name="name"
              value={editOrganization.name}
              onChange={(e) =>
                setEditOrganization({ ...editOrganization, name: e.target.value })
              }
              placeholder="Organization Name"
              className="input-field"
            />
            <input
              type="text"
              name="org_location"
              value={editOrganization.org_location}
              onChange={(e) =>
                setEditOrganization({ ...editOrganization, org_location: e.target.value })
              }
              placeholder="Organization Location"
              className="input-field"
            />
            <button type="submit" className="submit-button">
              Update Organization
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default OrgList;
