import React, { useState, useEffect } from 'react';

function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [editDepartment, setEditDepartment] = useState(null);

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
  }, []);

  const handleEdit = async (departmentId) => {
    // Fetch department data based on ID for editing
    try {
      const response = await fetch(`/api/department/${departmentId}`);
      if (response.status === 200) {
        const departmentData = await response.json();
        setEditDepartment(departmentData);
      } else {
        console.error('Error fetching department for editing:', response.status);
      }
    } catch (error) {
      console.error('Error fetching department for editing:', error);
    }
  };

  const handleUpdate = async () => {
    if (editDepartment) {
      try {
        const response = await fetch(`/api/department/${editDepartment._id}`, {
          method: 'PATCH', // Use PUT or PATCH as appropriate
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editDepartment),
        });

        if (response.status === 200) {
          // Update the local state with the edited department
          setDepartments((prevState) =>
            prevState.map((department) =>
              department._id === editDepartment._id ? editDepartment : department
            )
          );
          // Clear the editDepartment state
          setEditDepartment(null);
        } else {
          console.error('Error updating department:', response.status);
        }
      } catch (error) {
        console.error('Error updating department:', error);
      }
    }
  };

  const handleDelete = async (departmentId) => {
    // Implement the delete action, e.g., show a confirmation dialog and delete the department
        console.log(`Delete department with ID: ${departmentId}`);
        try {
            const response = await fetch(`/api/department/${departmentId}`, {
              method: 'DELETE',
            });
      
            if (response.status === 204) {
              // Department was successfully deleted
              // You can also remove the department from the local state
              setDepartments(departments.filter((department) => department._id !== departmentId));
            } else {
              const data = await response.json();
              console.error('Error deleting department:', data.error);
              // Handle the error or display an error message
            }
          } catch (error) {
            console.error('Error deleting department:', error);
            // Handle network or other errors
          }
    };

  return (
    <div className="table-container">
      <h2>List of Departments</h2>
      <table className="department-table">
        <thead>
          <tr>
            <th>Department Name</th>
            <th>Department Head</th>
            <th>Department Building</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department._id}>
              <td>{department.name}</td>
              <td>{department.dept_head}</td>
              <td>{department.dept_bldg}</td>
              <td>
                <button onClick={() => handleEdit(department._id)}>Edit</button>
                <button onClick={() => handleDelete(department._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Department Form */}
      {editDepartment && (
        <div className="edit-department-form">
          <h2>Edit Department</h2>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              name="name"
              value={editDepartment.name}
              onChange={(e) =>
                setEditDepartment({ ...editDepartment, name: e.target.value })
              }
              placeholder="Department Name"
              className="input-field"
            />
            <input
              type="text"
              name="dept_head"
              value={editDepartment.dept_head}
              onChange={(e) =>
                setEditDepartment({ ...editDepartment, dept_head: e.target.value })
              }
              placeholder="Department Head"
              className="input-field"
            />
            <input
              type="text"
              name="dept_bldg"
              value={editDepartment.dept_bldg}
              onChange={(e) =>
                setEditDepartment({ ...editDepartment, dept_bldg: e.target.value })
              }
              placeholder="Department Building"
              className="input-field"
            />
            <button type="submit" className="submit-button">
              Update Department
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default DepartmentList;
