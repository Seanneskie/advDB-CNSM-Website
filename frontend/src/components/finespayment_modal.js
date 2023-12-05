// finespayment_modal.js

import React, { useState, useEffect } from 'react';

const Modal = ({ toggleModal, selectedFines, updateFineStatus }) => {
  const [fineDetails, setFineDetails] = useState([]);

  useEffect(() => {
    // Fetch fine details when the component mounts
    const fetchFineDetails = async () => {
      try {
        const response = await Promise.all(
          selectedFines.map((fineId) =>
            fetch(`/api/fine/${fineId}`).then((response) => response.json())
          )
        );

        // response will be an array of fine details
        setFineDetails(response);
      } catch (error) {
        console.error('Error fetching fine details:', error);
      }
    };

    fetchFineDetails();
  }, [selectedFines]);

  const handleSubmit = async () => {
    // Update the status for each selected fine
    const updateStatusPromises = selectedFines.map(async (fineId) => {
      await fetch(`/api/fine/${fineId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: true, // Set status to true (assuming it represents paid)
        }),
      });
    });

    // Wait for all updates to complete
    await Promise.all(updateStatusPromises);

    // Notify the parent component to update the fine list
    updateFineStatus();

    // Close the modal
    toggleModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={toggleModal}>&times;</span>
        <h3>Selected Fines</h3>
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Amount</th>
              <th>Date of Penalty</th>
              <th>Event</th>
            </tr>
          </thead>
          <tbody>
            {fineDetails.map((fine) => (
              <tr key={fine._id}>
                <td>{fine.student}</td>
                <td>{fine.amount}</td>
                <td>{fine.date_of_penalty}</td>
                <td>{fine.event}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={toggleModal}>Close Modal</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
