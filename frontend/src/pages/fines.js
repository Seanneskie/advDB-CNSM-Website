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
              
                <div className='container-fines'>
                
                  <AddFines />
                  <EditFines />
                </div>
               
                
            </div>
        </div>
       
        
    )
}

export default Fines