import React, { useEffect, useState } from 'react';
import { Form, useParams } from 'react-router-dom';
import '../static/css/fines.css';
import Header from '../components/header';
import PaymentMethodModal from '../components/paymentmodal';
import FinesTable from '../components/finesTable';
import Payment from '../components/payment';


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

                <Payment
                    paymentRows={paymentRows}
                    totalAmount={totalAmount}
                    openPaymentModal={openPaymentModal}
                    isPaymentModalOpen={isPaymentModalOpen}
                    closePaymentModal={closePaymentModal}
                    handlePaymentMethodSelection={handlePaymentMethodSelection}
                />

             

            </div>

        </div>
    );
}

export default FinesProfile;
