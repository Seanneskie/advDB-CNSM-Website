// Payment.js
import React from 'react';
import PaymentMethodModal from '../components/paymentmodal';

const Payment = ({ paymentRows, totalAmount, openPaymentModal, isPaymentModalOpen, closePaymentModal, handlePaymentMethodSelection }) => {
    return (
        <div className='payment'>
            <h2>Payment</h2>
            <div>
                {/* You can add other components or elements here if needed */}
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Event</th>
                        <th>Desc.</th>
                        <th>Org</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentRows.map((rowData, index) => (
                        <tr key={index}>
                            <td>{rowData.eventName}</td>
                            <td>{rowData.description}</td>
                            <td>{rowData.organization}</td>
                            <td>{rowData.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>Total Fines: {totalAmount}</p>
            <button onClick={openPaymentModal}>Open Payment Modal</button>
            <div className="payment-modal-container">
                <PaymentMethodModal
                    show={isPaymentModalOpen}
                    onClose={closePaymentModal}
                    onPaymentMethodSelect={handlePaymentMethodSelection}
                />
            </div>
        </div>
    );
};

export default Payment;
    