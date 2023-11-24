import React from 'react';
import '../static/css/propview.css';

const ProposalView = ({ proposal }) => {
  const {
    proponent,
    start_date,
    project_name,
    ETA,
    status,
    organization,
    agreedVotes,
    disagreedVotes,
  } = proposal;

  return (
    <div className="proposal-profile">
      <h2>{project_name}</h2>
      <p><strong>Proponent:</strong> {proponent}</p>
      <p><strong>Start Date:</strong> {start_date}</p>
      <p><strong>ETA:</strong> {ETA}</p>
      <p><strong>Status:</strong> {status}</p>
      <p><strong>Organization:</strong> {organization}</p>
      <p><strong>Agreed Votes:</strong> {agreedVotes}</p>
      <p><strong>Disagreed Votes:</strong> {disagreedVotes}</p>
    </div>
  );
};

export default ProposalView;
