import React from 'react';
import Header from '../components/header';
import ClassForm from '../forms/classForm';
import '../static/css/class.css';
import ClassList from '../components/classList';




function Classification() {
    return (
        <div>
            <Header />
            <div className='ClassForm'>
                <ClassForm />
                <hr></hr>
                <ClassList />
   
            
            </div>
        </div>
       
        
    )
}

export default Classification