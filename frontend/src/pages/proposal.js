import React, { useState } from 'react'
import  '../static/css/proposal.css'
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import ProposalList from '../components/proposalist';
import ProposalProfile from '../components/proposalview';



function Proposal() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    
    const toggleSidebar = () => {
      console.log('Toggling sidebar');
      setIsSidebarOpen(!isSidebarOpen);
    };

    const sampleProposal = {
        proponent: "5fbdbacb86b4f5092a1733e0",
        start_date: "2023-01-01T00:00:00.000Z",
        project_name: "Sample Project",
        ETA: "2023-12-31T23:59:59.999Z",
        status: "Pending",
        organization: "5fbdbacb86b4f5092a1733e1",
        agreedVotes: 0,
        disagreedVotes: 0,
      };

    return (
        <div>
            
            <Header toggleSidebar={toggleSidebar} />
            <div className='content'>
                <Sidebar isVisible={isSidebarOpen} toggleSidebar={toggleSidebar} /> 
              
                <div className='container-proposal'>
                    <ProposalList />
                    <ProposalProfile proposal={sampleProposal} />
                 
                </div>
               
                
            </div>
        </div>
       
        
    )
}

export default Proposal