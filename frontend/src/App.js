import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import your Header component
import Dashboard from './pages/dashboard'
import Department from './pages/department';
import Course from './pages/course';
import Organization from './pages/organization';
import Classification from './pages/class';
import Student from './pages/student';
import Profile from './pages/profile';
import Event from './pages/event';
import Fines from './pages/fines';
import FinesProfile from './pages/fines-profile';
import DisplayFines from './components/finedisplay';
import FineVisual from './pages/fine-visualization';
import Proposal from './pages/proposal';
import ProposalView from './components/proposalmodal';



function App() {
  return (
    <Router>
      <div className="App">
 
        
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />}>   {/* Content for the Home page */} </Route>
            <Route path="/fines-view" element={<DisplayFines />}>   {/* Content for the Display Fines  */} </Route>
            <Route path="/about">
              {/* Content for the About page */}
            </Route>
            <Route path="/student" element={<Student />} >
              {/* Content for the Student page */}
            </Route>
            <Route path= "/class"  element={<Classification />}>
              {/* Content for the Student page */}
            </Route>
            <Route path="/department" element={<Department />} >
              {/* Content for the Student page */}
            </Route>
            <Route path="/course" element={<Course />} >
              {/* Content for the Student page */}
            </Route>
            <Route path="/org" element={<Organization />} >
              {/* Content for the Student page */}
            </Route>
            <Route path="/contact">
              {/* Content for the Contact page */}
            </Route>
            <Route path="/event" element={<Event />}>
              {/* Content for the Contact page */}
            </Route>
            <Route path="/fines" element={<Fines />}>
              {/* Content for the Contact page */}
            </Route>
            <Route path="/proposal" element={<Proposal />}>
              {/* Content for the Contact page */}
            </Route>
            <Route path="/proposal/:id" element={<ProposalView />}>
              {/* Content for the Contact page */}
            </Route>
            <Route path="/fines-visual" element={<FineVisual />}>
              {/* Content for the Fine Visual page */}
            </Route>
            <Route path="/fines-profile/:studentId" element={<FinesProfile />}>
              {/* Content for the Contact page */}
            </Route>
            <Route path="/profile/:id" element={<Profile /> }>
              {/* Content for the Contact page */}
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
