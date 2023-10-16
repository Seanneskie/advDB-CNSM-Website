import React from 'react';
import DepartmentForm from '../forms/departmentForm';
import DepartmentList from '../components/deptList';
import  '../static/css/department.css'
import Header from '../components/header';

function Department() {
    return (
        <div>
            <Header />
            <div className='DepartmentForm'>
                <DepartmentForm />
                <hr></hr>
                <DepartmentList />
            </div>
        </div>
       
        
    )
}

export default Department