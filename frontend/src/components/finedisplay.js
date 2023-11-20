import React, { useState, useEffect } from 'react';
import '../static/css/finedisplay.css';
import Header from '../components/header';
import Sidebar from '../components/sidebar';


function DisplayFines() {
  const [finesList, setFinesList] = useState([]);
  const [studentsMap, setStudentsMap] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const sortedFines = [...finesList].sort((a, b) => {
    if (sortConfig.direction === 'ascending') {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    }
    if (sortConfig.direction === 'descending') {
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    }
    return 0;
  });

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
                <th onClick={() => requestSort('student')} className={getClassNamesFor('student')}>
                  Student
                </th>
                <th onClick={() => requestSort('name')} className={getClassNamesFor('name')}>
                  Name
                </th>
                <th onClick={() => requestSort('description')} className={getClassNamesFor('description')}>
                  Description
                </th>
                <th onClick={() => requestSort('organization.name')} className={getClassNamesFor('organization.name')}>
                  Organization
                </th>
                <th onClick={() => requestSort('amount')} className={getClassNamesFor('amount')}>
                  Amount
                </th>
                <th onClick={() => requestSort('date_of_penalty')} className={getClassNamesFor('date_of_penalty')}>
                  Date of Penalty
                </th>
                <th onClick={() => requestSort('status')} className={getClassNamesFor('status')}>
                  Status
                </th>
                <th onClick={() => requestSort('event')} className={getClassNamesFor('event')}>
                  Event
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedFines.map((fine) => (
                <tr key={fine._id}>
                  <td>{studentsMap[fine.student]}</td>
                  <td>{fine.name}</td>
                  <td>{fine.description}</td>
                  <td>{fine.organization.name}</td>
                  <td>{fine.amount}</td>
                  <td>{fine.date_of_penalty}</td>
                  <td>{fine.status ? 'Paid' : 'Unpaid'}</td>                 
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
