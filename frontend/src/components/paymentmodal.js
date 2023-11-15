import React from 'react';
import Modal from 'react-overlays/Modal';
import  '../static/css/modal.css';
function PaymentMethodModal({ show, onClose, onPaymentMethodSelect }) {
  return (
    <Modal
      show={show}
      onHide={onClose}
      backdrop="static" // This prevents closing the modal by clicking outside
    >
     <div className="modal">
        <h2>Choose Payment Method</h2>
        <div className="button-container">
            <button onClick={() => onPaymentMethodSelect('Credit Card')}>Paymaya</button>
            <button onClick={() => onPaymentMethodSelect('PayPal')}>Gcash</button>
            <button onClick={() => onPaymentMethodSelect('Cash')}>Cash</button>
            {/* Add more payment method options as needed */}
           
        </div>
        <br></br>
        <hr></hr>
        <button onClick={onClose}>Close</button>
    </div>

    </Modal>
  );
}

export default PaymentMethodModal;
