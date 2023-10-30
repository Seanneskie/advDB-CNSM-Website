import React from 'react';


import Card  from '../components/card';
import '../static/css/dashboard.css';
import '../static/css/card.css';
import smile from  '../static/images/smile.jpg'
import sit from '../static/images/sit.jpg'
import elj1 from '../static/images/elj1.jpg'
import elj2 from '../static/images/elj2.jpg'
import elj3 from '../static/images/elj3.jpg'
import elj4 from '../static/images/elj4.jpg'
import elj5 from '../static/images/elj5.jpg'
import Header from  '../components/header';

function Dashboard() {
    return(
   
        <div>
            <Header />
            <div className='card-container'>
                <Card title="Student" description="Count" imageUrl= {smile}  href="/student"/>
                <Card title="Course" description="Count" imageUrl={sit} href="/course"/>
                <Card title="Department" description="Count" imageUrl={elj1} href="/department" />
                <Card title="Organization" description="Count" imageUrl={elj2} href="/org" />
                <Card title="Events" description="Count" imageUrl= {elj3} href="/event" />
                <Card title="Fines" description="Count" imageUrl= {elj4} />
                <Card title="Project Proposals" description="Count" imageUrl= {elj5}/>
                <Card title="Classification" description="Count" imageUrl= {elj5} href="/class"/>
            </div>      
        </div>

        
    )
}


export default Dashboard