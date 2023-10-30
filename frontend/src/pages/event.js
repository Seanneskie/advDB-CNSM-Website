import React from 'react';
import '../static/css/event.css'
import Header from '../components/header';
import EventForm from '../forms/eventForm';
// import EventList from '../components/eventList';

function Event() {
    return (
        <div>
            <Header />
            <div className='EventForm'>
                <EventForm />
                <hr></hr>
             
            
            </div>
        </div>
       
        
    )
}

export default Event