import React from 'react';
import '../static/css/proplist.css';

const ProposalList = () => {
  return (
    <div className="proposal-list">
      <h2>List of Proposals</h2>
      <ul>
        <li>
          <a id='proposal' href='###'>Sample Proposal 1</a>
        </li>
        <li>
          <a id='proposal' href='###'>Sample Proposal 2</a>
        </li>
        <li>
          <a id='proposal' href='###'>Sample Proposal 3</a>
        </li>
      </ul>
    </div>
  );
};

export default ProposalList;
