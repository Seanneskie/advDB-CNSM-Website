// Card.js

import React from 'react';

function Card({ title, description, imageUrl, href }) {
  return (
    <div className="card">
      <img src={imageUrl} alt="Card" className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        <a className="card-manage" href= {href}> Manage </a>
      </div>
    </div>
  );
}

export default Card;
