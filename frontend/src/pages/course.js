import React from 'react';
import CourseForm from '../forms/courseForm';
import CourseList from '../components/courseList';
import  '../static/css/course.css'
import Header from '../components/header';

function Course() {
    return (
        <div>
            <Header />
            <div className='CourseForm'>
                <CourseForm />
                <hr></hr>
                <CourseList />
            </div>
        </div>
       
        
    )
}

export default Course