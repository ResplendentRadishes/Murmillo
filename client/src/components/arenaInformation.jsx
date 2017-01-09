import React from 'react';
//import '.';
require ('../styles/arena.css'); 
const ArenaInformation = (props) => (
  <div className= "arenaInformationPanel">
    <div className="panel panel-default descriptionPanel">
      <div className="panel-heading">
        Description:
      </div>
      <div className="panel-body" >
        {props.desc}
      </div>
    </div>
    <div className="panel panel-default submissionResultsPanel">
      <div className="panel-heading">
        Submission Result
      </div>
      <div className="panel-body" >
        {props.status}
      </div>
    </div>
  </div>
);

export default ArenaInformation;
