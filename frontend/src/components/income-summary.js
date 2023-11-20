// IncomeSummary.js
import React, { useEffect, useState } from 'react';
import BarChartEx from '../components/barchart';

const IncomeSummary = ({ onIncomeReceived }) => {
  const [paidFinesTotal, setPaidFinesTotal] = useState(0);
  const [unpaidFinesTotal, setUnpaidFinesTotal] = useState(0);

  useEffect(() => {
    // Fetch fines data when the component mounts
    fetch('/api/fine')
      .then((response) => response.json())
      .then((data) => {
        // Calculate the total income of paid and unpaid fines
        const paidTotal = data.reduce((total, fine) => (fine.status ? total + fine.amount : total), 0);
        const unpaidTotal = data.reduce((total, fine) => (!fine.status ? total + fine.amount : total), 0);

        setPaidFinesTotal(paidTotal);
        setUnpaidFinesTotal(unpaidTotal);

        // Pass the income to the parent component
        onIncomeReceived({ paid: paidTotal, unpaid: unpaidTotal });
      })
      .catch((error) => console.error('Error fetching fines data:', error));
  }, [onIncomeReceived]);

  // Prepare data for the BarChart
  const barChartData = [
    { category: 'Total of Paid Fines', count: paidFinesTotal },
    { category: 'Total of Unpaid Fines', count: unpaidFinesTotal },
  ];

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <BarChartEx data={barChartData} />
      </div>
    </div>
  );
};

export default IncomeSummary;
