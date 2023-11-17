// Sidebar.js

import React from 'react';
import '../static/css/sidebar.css'

import SidebarLink from './sidebarlink';  // Make sure to provide the correct path  

const Sidebar = ({ isVisible, toggleSidebar }) => {
  return (
    <div>
      <div className={`sidebar ${isVisible ? 'visible' : 'hidden'}`}>
        {/* Toggle button within the sidebar */}
        <ul>
          <SidebarLink href="/student" label="Student" />
          <SidebarLink href="/course" label="Course" />
          <SidebarLink href="/department" label="Department" />
          <SidebarLink href="/org" label="Organization" />
          <SidebarLink href="/event" label="Events" />
          <SidebarLink href="/fines" label="Fines" />
          <SidebarLink href="/project-proposals" label="Project Proposals" />
          <SidebarLink href="/class" label="Classification" />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;