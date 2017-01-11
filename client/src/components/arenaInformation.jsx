import React from 'react';
require ('../styles/arena.css');

// ===============================================
// CSS Stylying
const panelStyle = {
  height: '200px',
  margin: '0px'
};

// ===============================================

const ArenaInformation = (props) => {

  return (
    <div className= "arenaInformationPanel">

      {/* ------ Description ------ */}
      <div className="panel panel-default descriptionPanel" style={panelStyle}>
        <div className="panel-heading">
          Description:
        </div>
        <div className="panel-body" >
          {props.desc}
        </div>
      </div>

      {/* ------ SubmissionResult ------ */}
      <div className="panel panel-default submissionResultsPanel" style={panelStyle}>
        <div className="panel-heading">
          Submission Result
        </div>
        <div className="panel-body" >
          {props.status}
        </div>
      </div>

      {/* ------ CompetitionUpdate ------ */}
      <div className="panel panel-default CompetitionUpdate" style={panelStyle}>
        <div className="panel-heading">
          Competition Live Update
        </div>
        <div className="panel-body" >
          {props.compUpdate}
        </div>
      </div>

    </div>
  );
}

export default ArenaInformation;
