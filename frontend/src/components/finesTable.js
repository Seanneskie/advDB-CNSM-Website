// FinesTable.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FinesTable = ({ updatePaymentRows }) => {
    const [fines, setFines] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]); // Initialize as an empty array
    const { studentId } = useParams();
    const setPaymentRows = useState([])[1];


    const handleAddToPayment = () => {
        try {
            // Create an array to hold the selected row data
            const selectedRowData = selectedRows.map((isChecked, index) => {
                try {
                    if (isChecked) {
                        const fine = fines[index];
                        console.log('Fine:', fine);
                        // Check if the fine object is defined
                        if (fine) {
                            return {
                                eventName: fine.name,
                                description: fine.description,
                                date: fine.date_of_penalty.substring(0, 10),
                                time: fine.date_of_penalty.substring(11, 16),
                                organization: fine.organization ? fine.organization.name : '',
                                status: fine.status ? 'Paid' : 'Unpaid',
                                amount: fine.amount,
                            };
                     
                        }
                    }
                 
                    return null;
                } catch (error) {
                    console.error(`Error processing row at index ${index}:`, error);
                    return null;
                }
            });
    
            // Filter out null values (rows that are not selected)
            const selectedRowsList = selectedRowData.filter((rowData) => rowData !== null);
    
            // Set the selected rows to display in the "payment" section
            setPaymentRows(selectedRowsList);
            updatePaymentRows(selectedRowsList);
        } catch (error) {
            console.error('Error in handleAddToPayment:', error);
        }
    };
    

    const handleCheckboxChange = (index) => {
        // Toggle the checkbox status
        const updatedSelectedRows = [...selectedRows];
        updatedSelectedRows[index] = !updatedSelectedRows[index];
        setSelectedRows(updatedSelectedRows);
    };

    useEffect(() => {
        // Fetch all fines
        fetch(`/api/fine?student=${studentId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((allFines) => {
                // Initialize selectedRows with false for each fine
                const initialSelectedRows = Array(allFines.length).fill(false);
                setSelectedRows(initialSelectedRows);

                // Filter fines based on the student ID
                const studentFines = allFines.filter((fine) => fine.student === studentId);
                setFines(studentFines);
            })
            .catch((error) => console.error(error));
    }, [studentId]);

    return (
        <div className='fines-table'>
            <table>
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>Event Name</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Org</th>
                        <th>Status</th>
                        <th>Amount</th>
                    </tr>
                </thead>

                <tbody>
                    {fines.map((fine, index) => {
                        // Check if the fine is unpaid before rendering the row
                        if (fine.status !== true ) {
                            return (
                                <tr key={index}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedRows[index] || false}
                                            onChange={() => handleCheckboxChange(index)}
                                        />
                                    </td>
                                    <td>{fine.name}</td>
                                    <td>{fine.description}</td>
                                    <td>{fine.date_of_penalty.substring(0, 10)}</td>
                                    <td>{fine.date_of_penalty.substring(11, 16)}</td>
                                    <td>{fine.organization && fine.organization.name}</td>
                                    <td>{fine.status ? 'Paid' : 'Unpaid'}</td>
                                    <td>{fine.amount}</td>
                                </tr>
                            );
                        }

                        return null; // Skip rendering for paid fines
                    })}
                    {/* Sample row for testing */}
                    <tr>
                        <td>
                            <input
                                type="checkbox"
                                checked={selectedRows[fines.length] || false}
                                onChange={() => handleCheckboxChange(fines.length)}
                            />
                        </td>
                        <td> Intrams Day 1</td>
                        <td> Morning-Sign in </td>
                        <td> 01/01/2021 </td>
                        <td> 9:00 </td>
                        <td> OMANSS </td>
                        <td> Unpaid </td>
                        <td> 150 </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="8" className="add-payment-button">
                            <button>Select All</button>
                            <button onClick={handleAddToPayment}>Add to Payment</button>
                        </td>
                    </tr>
                </tfoot>
            </table>

            
        </div>
    );
};

export default FinesTable;
