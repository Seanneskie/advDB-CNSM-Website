// Import necessary dependencies and components
import React, { useState } from 'react';
import IncomeSummary from '../components/income-summary';
import FinesCount from '../charts/finescount';
import '../static/css/finevisual.css'
import Sidebar from '../components/sidebar';
import Header from '../components/header';


// Create the main React component
const FineVisual = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        console.log('Toggling sidebar');
        setIsSidebarOpen(!isSidebarOpen);
    };

 
  return (
    <div>
        <Header toggleSidebar={toggleSidebar} />
        <div>
        <Sidebar isVisible={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <h1>Fines Data Visualization </h1>

            {/* Render the IncomeSummary component */}
            <IncomeSummary />

            {/* Render the FinesCount component */}
            <FinesCount />
        </div>
     
    </div>
  );
};

export default FineVisual;
