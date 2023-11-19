// SidebarLink.js

import React from 'react';
import { Link } from 'react-router-dom';  // Make sure to provide the correct path 
import '../static/css/sidebarlink.css'

const SidebarLink = ({ href, label, dropdownItems }) => {
  const renderDropdown = () => {
    if (dropdownItems && dropdownItems.length > 0) {
      return (
        <ul className="dropdown">
          {dropdownItems.map((item, index) => (
            <li key={index}>
              <Link to={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <li>
      <Link to={href}>{label}</Link>
      {renderDropdown()}
    </li>
  );
};

export default SidebarLink;
