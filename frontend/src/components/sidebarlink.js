// SidebarLink.js

import React from 'react';
import '../static/css/sidebarlink.css'

const SidebarLink = ({ href, label }) => {
  return (
    <li>
      <a href={href}>
        {label}
      </a>
    </li>
  );
};

export default SidebarLink;
