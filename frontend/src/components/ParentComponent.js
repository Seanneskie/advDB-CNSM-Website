// ParentComponent.js

import React, { useState } from 'react';
import Modal from './finespayment_modal';

const ParentComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateFineStatus = () => {
    console.log('Updating fine status...');
    // Implement your logic to update fine status
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      {isModalOpen && (
        <Modal
          toggleModal={closeModal}
          selectedFines={[/* your selected fines array here */]}
          updateFineStatus={updateFineStatus} // Make sure updateFineStatus is passed
        />
      )}
    </div>
  );
};

export default ParentComponent;
