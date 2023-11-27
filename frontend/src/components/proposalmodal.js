import React, { useState } from 'react';
import Modal from 'react-modal';
import '../static/css/propview.css';

const AddProposalModal = ({ isOpen, onRequestClose, onAddProposal }) => {
  const [newProposal, setNewProposal] = useState({
    proponent: '',
    start_date: '',
    project_name: '',
    ETA: '',
    status: '',
    organization: '',
    agreedVotes: 0,
    disagreedVotes: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProposal((prevProposal) => ({
      ...prevProposal,
      [name]: value,
    }));
  };

  const handleAddProposal = () => {
    // Perform any validation here before adding the proposal
    onAddProposal(newProposal);
    setNewProposal({
      proponent: '',
      start_date: '',
      project_name: '',
      ETA: '',
      status: '',
      organization: '',
      agreedVotes: 0,
      disagreedVotes: 0,
    });
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Proposal Modal"
    >
      <h2>Add New Proposal</h2>
      <form>
        <label>
          Proponent:
          <input
            type="text"
            name="proponent"
            value={newProposal.proponent}
            onChange={handleInputChange}
          />
        </label>
        {/* Repeat the above label and input for other fields */}
        <button type="button" onClick={handleAddProposal}>
          Add Proposal
        </button>
        <button type="button" onClick={onRequestClose}>
          Cancel
        </button>
      </form>
    </Modal>
  );
};

export default AddProposalModal;