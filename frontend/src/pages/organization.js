import React from 'react';
import '../static/css/org.css'
import Header from '../components/header';
import OrgForm from '../forms/orgForm';
import OrgList from '../components/orgList';

function Organization() {
    return (
        <div>
            <Header />
            <div className='OrgForm'>
                <OrgForm />
                <hr></hr>
                <OrgList />
            
            </div>
        </div>
       
        
    )
}

export default Organization