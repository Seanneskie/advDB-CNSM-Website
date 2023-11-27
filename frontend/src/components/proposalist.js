import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../static/css/proplist.css';
import AddProposalModal from '../components/proposalmodal.js';

const ProposalList = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleAddProposal = (newProposal) => {
    // Implement the logic to add the new proposal to the list
    // You can use useState or any other state management technique to update the list of proposals
  };

  return (
    <div className="proposal-list">
      <h2>List of Proposals</h2>
      <button onClick={toggleModal}>
        <FontAwesomeIcon icon={faPlus} />
        Add Proposal
      </button>
      <ul>
        <li>
          <a id="proposal" href="###">
            Sample Proposal 1
          </a>
        </li>
        <li>
          <a id="proposal" href="###">
            Sample Proposal 2
          </a>
        </li>
        <li>
          <a id="proposal" href="###">
            Sample Proposal 3
          </a>
        </li>
      </ul>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <AddProposalModal
              isOpen={true} // Pass the isOpen prop as true to show the modal
              onRequestClose={toggleModal} // Pass the toggleModal function as onRequestClose prop
              onAddProposal={handleAddProposal} // Pass the appropriate function to handle adding a proposal
            />
            <button onClick={toggleModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProposalList;