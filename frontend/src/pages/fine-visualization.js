import React, { useState } from 'react';
import IncomeSummary from '../components/income-summary';
import FinesCount from '../charts/finescount';
import '../static/css/finevisual.css'; // Import the CSS file
import Sidebar from '../components/sidebar';
import Header from '../components/header';

const FineVisual = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [finesCounts, setFinesCounts] = useState({ paid: 0, unpaid: 0 });
  const [incomeSummary, setIncomeSummary] = useState({ paid: 0, unpaid: 0 });

  const toggleSidebar = () => {
    console.log('Toggling sidebar');
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCountsReceived = (counts) => {
    setFinesCounts(counts);
  };

  const handleIncomeReceived = (income) => {
    setIncomeSummary(income);
  };

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />
      <div>
        <Sidebar isVisible={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <h1 id='finesh1'>Fines Data Visualization </h1>
        <div className='charts-content'>
          <div className='chart-container'>
            {/* Render the FinesCount component */}
            <FinesCount onCountsReceived={handleCountsReceived} />
            <h2>Fines Count Summary</h2>
            <p>Paid: {finesCounts.paid}</p>
            <p>Unpaid: {finesCounts.unpaid}</p>
          </div>
          <div className='chart-container'>
            {/* Render the IncomeSummary component */}
            <IncomeSummary onIncomeReceived={handleIncomeReceived} />
            <h2>Fines Income Summary</h2>
            <p>Paid Total Income: P{incomeSummary.paid}</p>
            <p>Unpaid Total Income: P{incomeSummary.unpaid}</p>
            <p>Total Income: P{incomeSummary.paid + incomeSummary.unpaid}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FineVisual;
