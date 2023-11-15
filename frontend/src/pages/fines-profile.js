import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../static/css/fines.css';
import Header from '../components/header';
import PaymentMethodModal from '../components/paymentmodal';
import FinesTable from '../components/finesTable';


function FinesProfile() {

    const [student, setStudent] = useState(null);
    const { studentId } = useParams();
    const [paymentRows, setPaymentRows] = useState([]);
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
    const totalAmount = paymentRows.reduce((total, row) => total + row.amount, 0);

    const openPaymentModal = () => {
        setPaymentModalOpen(true);
    };

    const closePaymentModal = () => {
        setPaymentModalOpen(false);
    };

    const handlePaymentMethodSelection = (method) => {
        closePaymentModal(); // Close the modal after selecting a method
    };

    const updatePaymentRows = (newPaymentRows) => {
        setPaymentRows(newPaymentRows);
      };

    useEffect(() => {
        fetch(`/api/student/${studentId}`)
            .then((response) => response.json())
            .then((data) => {
                setStudent(data)
            })
            .catch((error) => console.error(error));
    }, [studentId]);


    // Fetch Course
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
            })
            .catch((error) => console.error(error));
    }, [studentId]);

    // Fetch Organization
 
    

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
                            <p>
                                {student.address.house_no}, {student.address.street}, {student.address.barangay},{' '}
                                {student.address.city}, {student.address.province}, {student.address.zip_code}
                            </p>
                        </div>

                        <label>Contact Number:</label>
                        <p>{student.contact}</p>

                        <label>Course and Year Level:</label>
                        <p>{`${student.course} - ${student.year_level}`}</p>

                        <label>Classification/Role:</label>
                        <p>{student.role ? `${student.role}` : 'N/A'}</p>
                    </div>
                </div>

                <FinesTable updatePaymentRows={updatePaymentRows} />

                <div className='payment'>
                    <h2>Payment</h2>
                    <div>
                        
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

             

            </div>
        </div>
    );
}

export default FinesProfile;
