import React from 'react';
import UserCardContainer from './userCardContainer.jsx';
import GraphContainer from './graphContainer.jsx';
const Statistics = (props) => (
  <div className="container">
    <div className="row">
      <div className="col-md-3">
        <UserCardContainer />
      </div>

      <div className="col-md-9">
        <GraphContainer />
      </div>
    
    </div>
  </div>
);

export default Statistics;