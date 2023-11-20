import React, { useState } from 'react';
import '../static/css/sidebarlink.css';

const SidebarLink = ({ href, label, dropdownItems }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <li>
      {dropdownItems ? (
        <div>
          <a href='######'className="dropdown-button" onClick={handleToggleDropdown}>
            {label}
          </a>
          {isDropdownOpen && (
            <ul>
              {dropdownItems.map((item) => (
                <li key={item.label}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <a href={href}>{label}</a>
      )}
    </li>
  );
};

export default SidebarLink;
