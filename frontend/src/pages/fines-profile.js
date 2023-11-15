import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../static/css/fines.css';
import Header from '../components/header';
import PaymentMethodModal from '../components/paymentmodal';


function FinesProfile() {

    const [student, setStudent] = useState(null);
    const [organization, setOrganization] = useState(null);
    const { studentId } = useParams();
    const [fines, setFines] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [paymentRows, setPaymentRows] = useState([]);
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

    const openPaymentModal = () => {
        setPaymentModalOpen(true);
    };

    const closePaymentModal = () => {
        setPaymentModalOpen(false);
    };

    const handlePaymentMethodSelection = (method) => {
        setSelectedPaymentMethod(method);
        closePaymentModal(); // Close the modal after selecting a method
    };

    const handlePayButtonClick = () => {
        openPaymentModal();
    };

    useEffect(() => {
        fetch(`/api/student/${studentId}`)
            .then((response) => response.json())
            .then((data) => {
                setStudent(data);
                calculateTotalFines(data._id);
            })
            .catch((error) => console.error(error));
    }, [studentId]);

    const calculateTotalFines = (studentId) => {
        fetch(`/api/attendance/total-fines/${studentId}`)
            .then((response) => response.json())
            .then((data) => {
                setStudent((prevStudent) => ({
                    ...prevStudent,
                    totalFines: data.totalFines,
                }));
            })
            .catch((error) => console.error(error));
    };

    const handleAddToPayment = () => {
        // Create an array to hold the selected row data
        const selectedRowData = selectedRows.map((index) => {
            // Assuming your table data is in a specific format (e.g., an array of objects)
            return {
                eventName: student.attendance[index].eventName,
                description: student.attendance[index].description,
                date: student.attendance[index].date,
                time: student.attendance[index].time,
                status: student.attendance[index].status,
                amount: student.attendance[index].amount,
            };
        });

        // You can now render the selected rows in the "payment" section
        // For example, create a list of selected rows:
        const selectedRowsList = selectedRowData.map((rowData, index) => (
            <li key={index}>
                <div>
                    <span>Event Name: {rowData.eventName}</span>
                    <span>Description: {rowData.description}</span>
                    <span>Date: {rowData.date}</span>
                    <span>Time: {rowData.time}</span>
                    <span>Status: {rowData.status}</span>
                    <span>Amount: {rowData.amount}</span>
                </div>
            </li>
        ));

        // Set the selected rows to display in the "payment" section
        setPaymentRows(selectedRowsList);
    };

    useEffect(() => {
        fetch(`/api/student/${studentId}`)
            .then((response) => response.json())
            .then(async (data) => {
                setStudent(data);
    
                if (data.course) {
    
                    // Assuming course is an ID, fetch the course details
                    const courseResponse = await fetch(`/api/course/${data.course}`);
                    const courseData = await courseResponse.json();
    
                    // Set the course name in the student object
                    setStudent((prevStudent) => ({
                        ...prevStudent,
                        course: courseData.name,
                    }));
                }
                console.log(student.course);
                calculateTotalFines(data._id);
            })
            .catch((error) => console.error(error));
    }, [studentId]);
    

    useEffect(() => {
        fetch(`/api/student/${studentId}`)
            .then((response) => response.json())
            .then(async (data) => {
                setStudent(data);
    
                if (data.course) {
    
                    // Assuming course is an ID, fetch the course details
                    const classResponse = await fetch(`/api/class/${data.classification}`);
                    const classData = await classResponse.json();
    
                    // Set the course name in the student object
                    setStudent((prevStudent) => ({
                        ...prevStudent,
                        classification: classData.description,
                    }));
                }
                console.log(student.classification);
                calculateTotalFines(data._id);
            })
            .catch((error) => console.error(error));
    }, [studentId]);

    useEffect(() => {
        fetch(`/api/student/${studentId}`)
            .then((response) => response.json())
            .then(async (data) => {
                setStudent(data);
    
                if (data.course) {
    
                    // Assuming course is an ID, fetch the course details
                    const courseResponse = await fetch(`/api/course/${data.course}`);
                    const courseData = await courseResponse.json();
    
                    // Set the course name in the student object
                    setStudent((prevStudent) => ({
                        ...prevStudent,
                        course: courseData.name,
                    }));
                }
                console.log(student.course);
                calculateTotalFines(data._id);
            })
            .catch((error) => console.error(error));
    }, [studentId]);
    
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
                // Filter fines based on the student ID
                const studentFines = allFines.filter((fine) => fine.student === studentId);
                setFines(studentFines);
                console.log(studentFines);
            })
            .catch((error) => console.error(error));
    }, [studentId]);
    

    if (!student) {
        return <div>Loading...</div>;
    }
    return (
        <div className='container-1'>
            <Header />
            <h1>Fines Profile</h1>
            <div className='main-fine'>
             <div className='student-profile'>
                    <div className='container-profile'>
                        <h1> Profile </h1>
                        <br></br>
                        <img src='https://via.placeholder.com/150' alt="Placeholder" />
                        <h2>{student.first_name} {student.last_name}</h2>
                        <p>Student ID: {student.student_id}</p>
                    </div>
                    <div className='container-information'>
                        <div className='full-address'>
                            <label>Full Address:</label>
                            <p>{student.address}</p>
                        </div>
                        <label>Contact Number:</label>
                        <p>{student.contact}</p>

                        <label>Course and Year Level:</label>
                        <p>{student.course ? `${student.course} - ${student.year_level}` : 'N/A'}</p>

                        <label>Classification/Role:</label>
                        <p>{student.classification ? `${student.classification}` : 'N/A'}</p>
                    </div>
                </div>

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
                        {fines.map((fine, index) => (
                            <tr key={index}>
                                <td><input type="checkbox" /></td>
                                <td>{fine.name}</td>
                                <td>{fine.description}</td>
                                <td>{fine.date_of_penalty.substring(0, 10)}</td>
                                <td>{fine.date_of_penalty.substring(11, 16)}</td>
                                <td>{fine.organization}</td>
                                <td>{fine.status ? 'Yes' : 'No'}</td>
                                <td>{fine.amount}</td>
                            </tr>
                        ))}


                        <tr>
                            <td><input type="checkbox" /></td>
                            <td> Intrams Day 1</td>
                            <td> Morning-Sign  in </td>
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
                <div className='payment'>
                    <h2>Payment</h2>
                    <p>Total Fines: {student.totalFines || 0}</p>
                    <ul>
                        {paymentRows}
                    </ul>
                    <button onClick={openPaymentModal}>Open Payment Modal</button>
                    <div className="payment-modal-container">
                        <PaymentMethodModal
                            show={isPaymentModalOpen}
                            onClose={closePaymentModal}
                            onPaymentMethodSelect={handlePaymentMethodSelection}
                        />
                    </div>
                </div>

             

            </div>
        </div>
    );
}

export default FinesProfile;
