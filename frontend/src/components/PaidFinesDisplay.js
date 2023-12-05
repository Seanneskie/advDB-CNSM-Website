import React, { useState, useEffect } from 'react';
import ModalButton from '../components/finesbuttonpayment_modal';

function PaidFinesDisplay() {
  const [paidFines, setPaidFines] = useState([]);
  const [studentsMap, setStudentsMap] = useState({});
  const [finesList, setFinesList] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [searchFilter, setSearchFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch paid fines data when the component mounts
    fetch('/api/fine?status=true')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched paid fines data:', data);
        setPaidFines(data);
      })
      .catch((error) => console.error('Error fetching paid fines data:', error));

    // Fetch fines data when the component mounts (for filtering)
    fetch('/api/fine?status=true')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched fines data:', data);
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

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    // Add your sorting logic here using the key and direction
  };

  const handleSearchFilter = (event) => {
    setSearchFilter(event.target.value.toUpperCase());
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  // Filter fines based on the search filter and unpaid status
  const filteredFines = finesList.filter((fine) => {
    const studentName = studentsMap[fine.student];
    const filterValue = searchFilter ? searchFilter.toLowerCase() : '';

    return (
      studentName &&
      studentName.toLowerCase().includes(filterValue) &&
      fine.status === true // Only include unpaid fines
    );
  });

  // Sorting fines based on the current sort configuration
  const sortedFines = [...filteredFines].sort((a, b) => {
    if (sortConfig.direction === 'ascending') {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    }
    if (sortConfig.direction === 'descending') {
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className='fines-display'>
      <h2>Paid Fines List</h2>

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
  );
}

export default PaidFinesDisplay;
