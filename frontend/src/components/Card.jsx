import React from 'react';

function Card({ title }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>Description of the task...</p>
    </div>
  );
}

export default Card;
