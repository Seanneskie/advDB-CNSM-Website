import React from 'react';
import '../static/css/student.css'
import Header from '../components/header';
import StudentForm from '../forms/studentForm';
import StudentList from '../components/studentList';

function Student() {
    return (
        <div>
            <Header />
            <div className='StudentForm'>
                <StudentForm />
                <hr></hr>
                <StudentList  />
     
            
            </div>
        </div>
       
        
    )
}

export default Student