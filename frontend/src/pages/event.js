import '../static/css/event.css'
import Header from '../components/header';
import React, { useState, useCallback } from 'react';
import { Calendar } from '@natscale/react-calendar';    
import '@natscale/react-calendar/dist/main.css';
// import EventList from '../components/eventList';

function Event() {
    const [value, setValue] = useState();

    const onChange = useCallback(
        (value) => {
        setValue(value);
        },
        [setValue],
    );

    console.log(value)
    return (
        <div>
            <Header />
            <div className='EventForm'>
                <Calendar value={value} onChange={onChange} size={400}/>

                <hr></hr>
             
            
            </div>
        </div>
       
        
    )
}

export default Event