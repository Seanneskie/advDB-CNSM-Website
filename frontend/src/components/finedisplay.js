import React, { useState, useEffect } from 'react';
import '../static/css/finedisplay.css'
import Header from '../components/header';
import Sidebar from '../components/sidebar';


function DisplayFines() {
  const [finesList, setFinesList] = useState([]);

  const [studentsMap, setStudentsMap] = useState({});

  useEffect(() => {
    // Fetch fines data when the component mounts
    fetch('/api/fine')
      .then((response) => response.json())
      .then((data) => {
        setFinesList(data);
      })
      .catch((error) => console.error('Error fetching fines data:', error));

    // Fetch student data to create a mapping of student IDs to names
    fetch('/api/student')
      .then((response) => response.json())
      .then((data) => {
        const studentsMapping = {};
        data.forEach((student) => {
          studentsMapping[student._id] = `${student.first_name} ${student.last_name}`;
        });
        setStudentsMap(studentsMapping);
      })
      .catch((error) => console.error('Error fetching student data:', error));
  }, []);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    
    const toggleSidebar = () => {
      console.log('Toggling sidebar');
      setIsSidebarOpen(!isSidebarOpen);
    };


  return (
    <div>
        <Header toggleSidebar={toggleSidebar} />
        <div className='content'>
            <Sidebar isVisible={isSidebarOpen} toggleSidebar={toggleSidebar} />
          
            <div className='fines-display'>
            <h2>Fines List</h2>
            
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Organization</th>
                    <th>Amount</th>
                    <th>Date of Penalty</th>
                    <th>Status</th>
                    <th>Student</th>
                    <th>Event</th>
                </tr>
                </thead>
                <tbody>
                {finesList.map((fine) => (
                    <tr key={fine._id}>
                    <td>{fine.name}</td>
                    <td>{fine.description}</td>
                    <td>{fine.organization.name}</td>
                    <td>{fine.amount}</td>
                    <td>{fine.date_of_penalty}</td>
                    <td>{fine.status ? 'Paid' : 'Unpaid'}</td>
                    <td>{studentsMap[fine.student]}</td>
                    <td>{fine.event}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
   
        </div>
    </div>
   
  );
}

export default DisplayFines;
