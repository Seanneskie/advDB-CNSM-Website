import React, { useState } from 'react'
import  '../static/css/fines.css'
import { AddFines, EditFines } from '../components/add-and-edit.';
import Header from '../components/header';
import Sidebar from '../components/sidebar';


function Fines() {
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
                <h1>Underconstruction pa ang manage/add fines</h1>
                <h2>Tester link  sa profile fines</h2>
                <p>http://localhost:3000/fines-profile/6552e2cb10614bf82d360100</p>
                <div className='form-container'>
                  <AddFines />
                  <EditFines />
                </div>
                
            </div>
        </div>
       
        
    )
}

export default Fines