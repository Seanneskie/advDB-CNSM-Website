import React, { useState, useEffect } from 'react';
import '../static/css/finedisplay.css';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import ModalButton from '../components/finesbuttonpayment_modal';
import Modal from '../components/finespayment_modal';
import PaidFinesDisplay from '../components/PaidFinesDisplay'; // Update the import statement for PaidFinesDisplay


function DisplayFines() {
  const [finesList, setFinesList] = useState([]);
  const [studentsMap, setStudentsMap] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [searchFilter, setSearchFilter] = useState('');
 const [selectedFines, setSelectedFines] = useState([]); // Add this line
 const [eventsMap, setEventsMap] = useState({});



  useEffect(() => {
    // Fetch only unpaid fines data when the component mounts
    fetch('/api/fine?status=false')
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
     fetch('/api/event')
      .then((response) => response.json())
      .then((data) => {
        const eventsMapping = {};
        data.forEach((event) => {
          eventsMapping[event._id] = event.name;
        });
        setEventsMap(eventsMapping);
      })
      .catch((error) => console.error('Error fetching event data:', error));
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

  // Filter fines based on the search filter and unpaid status
  const filteredFines = finesList.filter((fine) => {
    const studentName = studentsMap[fine.student];
    const filterValue = searchFilter ? searchFilter.toLowerCase() : '';

    return (
      studentName &&
      studentName.toLowerCase().includes(filterValue) &&
      fine.status === false // Only include unpaid fines
    );
  });

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

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

  // Function to handle the search filter
  const handleSearchFilter = (event) => {
    setSearchFilter(event.target.value.toUpperCase());
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Function to handle the checkbox change
  const handleCheckboxChange = (fineId) => {
    // Check if the fineId is already in the selectedFines array
    if (selectedFines.includes(fineId)) {
      // If yes, remove it from the array
      setSelectedFines((prevSelectedFines) =>
        prevSelectedFines.filter((id) => id !== fineId)
      );
    } else {
      // If not, add it to the array
      setSelectedFines((prevSelectedFines) => [...prevSelectedFines, fineId]);
    }
  };

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />
      <div className='content'>
        <Sidebar isVisible={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div>
        <div className='fines-display'>
          <h2>Fines List</h2>

          {/* Search input field */}
          <input
            type="text"
            id="myInput"
            value={searchFilter}
            onChange={handleSearchFilter}
            placeholder="Search for student names..."
          />

          {/* Clear button for search */}
          <button onClick={() => setSearchFilter('')}>Clear</button>

          {/* Button to show the modal */}
          <ModalButton toggleModal={toggleModal} />

          <table>
            <thead>
              <tr>
                <th></th>
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
                  <td>
                    {/* If the {fine.status ? 'Paid' : 'Unpaid'} is paid do not display the checkbox but if unpaid display */}
                    <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(fine._id)}
                />
                  </td>
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
{/* Modal */}
      {isModalOpen && (
        <Modal
          toggleModal={toggleModal}
          selectedFines={selectedFines}
        />
      )}
          
        </div>
        {/* Paid Fines Display */}
          <PaidFinesDisplay paidFines={sortedFines} studentsMap={studentsMap} />
</div>
      </div>
    </div>
  );
}


export default DisplayFines;
