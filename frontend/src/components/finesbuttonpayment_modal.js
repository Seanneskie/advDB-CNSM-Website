import React from 'react';

const ModalButton = ({ toggleModal }) => {
  return (
    <button onClick={toggleModal}>
      Open Modal
    </button>
  );
};

export default ModalButton;
