// FinesCount.js
import React, { useEffect, useState } from 'react';
import BarChartEx from '../components/barchart';

const FinesCount = () => {
  const [paidFinesCount, setPaidFinesCount] = useState(0);
  const [unpaidFinesCount, setUnpaidFinesCount] = useState(0);

  useEffect(() => {
    // Fetch fines data when the component mounts
    fetch('/api/fine')
      .then((response) => response.json())
      .then((data) => {
        // Calculate the total number of paid and unpaid fines
        const paidCount = data.reduce((count, fine) => (fine.status ? count + 1 : count), 0);
        const unpaidCount = data.reduce((count, fine) => (!fine.status ? count + 1 : count), 0);

        setPaidFinesCount(paidCount);
        setUnpaidFinesCount(unpaidCount);
      })
      .catch((error) => console.error('Error fetching fines data:', error));
  }, []);

  // Prepare data for the BarChart
  const barChartData = [
    { category: 'No. of Paid Fines', count: paidFinesCount },
    { category: 'No. of Unpaid Fines', count: unpaidFinesCount },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>

      <BarChartEx data={barChartData} /> {/* Include the BarChartEx component here */}
    </div>
  );
};

export default FinesCount;
