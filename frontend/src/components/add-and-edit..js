import React, { useState, useEffect } from 'react';
import '../static/css/fines.css';

function AddFines() {
    const [fineData, setFineData] = useState({
        name: '',
        description: '',
        organization: '',
        amount: 0,
        date_of_penalty: '',
        status: false,
        student: '', // Add student field
        event: '',
    });

    const [students, setStudents] = useState([]);
    const [organizations, setOrganizations] = useState([]);


    useEffect(() => {
        // Fetch student data when the component mounts
        // Replace the URL with your actual API endpoint
        fetch('/api/student')
            .then((response) => response.json())
            .then((data) => {
                setStudents(data);
            })
            .catch((error) => console.error('Error fetching student data:', error));
         // Fetch organization data when the component mounts
        // Replace the URL with your actual API endpoint for organizations
        fetch('/api/org')
            .then((response) => response.json())
            .then((data) => {
                setOrganizations(data);
            })
            .catch((error) => console.error('Error fetching organization data:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFineData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Add your logic to handle the submission of fine data
        // Call the API to add fines to the backend
        fetch('/api/fine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fineData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Fine data submitted successfully:', data);
                // Optionally, reset form fields after successful submission
                setFineData({
                    name: '',
                    description: '',
                    organization: '',
                    amount: 0,
                    date_of_penalty: '',
                    status: false,
                    student: '',
                    event: '',
                });
            })
            .catch((error) => console.error('Error submitting fine data:', error));
    };

    return (
        <div className='fines-form'>
            <h2>Add Fines</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>
                        Student:
                        <select name='student' value={fineData.student} onChange={handleChange}>
                            <option value=''>Select Student</option>
                            {students.map((student) => (
                                <option key={student._id} value={student._id}>
                                    {student.first_name} {student.last_name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Event Name:
                        <input type='text' name='name' value={fineData.name} onChange={handleChange} />
                        <input type='text' name='event' value={fineData.event} onChange={handleChange} hidden />
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Description:
                        <input type='text' name='description' value={fineData.description} onChange={handleChange} />
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Organization:
                        <select name='organization' value={fineData.organization} onChange={handleChange}>
                            <option value=''>Select Organization</option>
                            {organizations.map((organization) => (
                                <option key={organization._id} value={organization._id}>
                                    {organization.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Amount:
                        <input type='number' name='amount' value={fineData.amount} onChange={handleChange} />
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Date of Penalty:
                        <input type='date' name='date_of_penalty' value={fineData.date_of_penalty} onChange={handleChange} />
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Status:
                        <input
                            type='checkbox'
                            name='status'
                            checked={fineData.status}
                            onChange={(e) => setFineData((prevData) => ({ ...prevData, status: e.target.checked }))}
                        />
                    </label>
                </div>
  

                <button type='submit'>Add Fines</button>
            </form>
        </div>
    );
}


function EditFines() {
    const [fineData, setFineData] = useState({
        name: '',
        description: '',
        organization: '',
        amount: 0,
        date_of_penalty: '',
        status: false,
        student: '',
        event: '',
    });

    const [students, setStudents] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [finesList, setFinesList] = useState([]);
    const [selectedFineId, setSelectedFineId] = useState(null);

    useEffect(() => {
        // Fetch student data when the component mounts
        fetch('/api/student')
            .then((response) => response.json())
            .then((data) => {
                setStudents(data);
            })
            .catch((error) => console.error('Error fetching student data:', error));

        // Fetch organization data when the component mounts
        fetch('/api/org')
            .then((response) => response.json())
            .then((data) => {
                setOrganizations(data);
            })
            .catch((error) => console.error('Error fetching organization data:', error));

        // Fetch fines data when the component mounts
        fetch('/api/fine')
            .then((response) => response.json())
            .then((data) => {
                setFinesList(data);
            })
            .catch((error) => console.error('Error fetching fines data:', error));
    }, []);

    const handleSelectChange = (e) => {
        const selectedId = e.target.value;
        setSelectedFineId(selectedId);

        // Find the selected fine in the finesList
        const selectedFine = finesList.find((fine) => fine._id === selectedId);

        // Update the form fields with the selected fine data
        setFineData({
            name: selectedFine.name,
            description: selectedFine.description,
            organization: selectedFine.organization,
            amount: selectedFine.amount,
            date_of_penalty: selectedFine.date_of_penalty,
            status: selectedFine.status,
            student: selectedFine.student,
            event: selectedFine.event,
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFineData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic to handle the submission of edited fine data
        // e.g., call an API to update fines in the backend
        console.log('Submitting edited fine data:', fineData);
    };

    return (
        <div className='fines-form'>
            <h2>Edit Fines</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>
                        Select Fine to Edit:
                        <select value={selectedFineId} onChange={handleSelectChange}>
                            <option value=''>Select Fine</option>
                            {finesList.map((fine) => (
                                <option key={fine._id} value={fine._id}>
                                    {fine.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Student:
                        <select name='student' value={fineData.student} onChange={handleChange}>
                            <option value=''>Select Student</option>
                            {students.map((student) => (
                                <option key={student._id} value={student._id}>
                                    {student.first_name} {student.last_name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                {/* Other form fields go here */}
                <div className='form-group'>
                    <label>
                        Event Name:
                        <input type='text' name='name' value={fineData.name} onChange={handleChange} />
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Description:
                        <input type='text' name='description' value={fineData.description} onChange={handleChange} />
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Organization:
                        <select name='organization' value={fineData.organization} onChange={handleChange}>
                            <option value=''>Select Organization</option>
                            {organizations.map((organization) => (
                                <option key={organization._id} value={organization._id}>
                                    {organization.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Amount:
                        <input type='number' name='amount' value={fineData.amount} onChange={handleChange} />
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Date of Penalty:
                        <input type='date' name='date_of_penalty' value={fineData.date_of_penalty} onChange={handleChange} />
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Status:
                        <input
                            type='checkbox'
                            name='status'
                            checked={fineData.status}
                            onChange={(e) => setFineData((prevData) => ({ ...prevData, status: e.target.checked }))}
                        />
                    </label>
                </div>
                <button type='submit'>Edit Fines</button>
            </form>
        </div>
    );
}


export { AddFines, EditFines };

