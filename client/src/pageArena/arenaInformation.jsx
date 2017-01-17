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
  const title = props.problem.title;
  const description = props.problem.prompt;
  const resultMsg = props.competition.resultMsg;
  const compUpdate = props.competition.compUpdate;

  return (
    <div className= "arenaInformationPanel">

      {/* ------ Description ------ */}
      <div className="panel panel-default descriptionPanel" style={panelStyle}>
        <div className="panel-heading">
          {title}
        </div>
        <div className="panel-body" >
          {description}
        </div>
      </div>

      {/* ------ SubmissionResult ------ */}
      <div className="panel panel-default submissionResultsPanel" style={panelStyle}>
        <div className="panel-heading">
          Submission Result
        </div>
        <div className="panel-body" >
          {resultMsg}
        </div>
      </div>

      {/* ------ CompetitionUpdate ------ */}
      <div className="panel panel-default CompetitionUpdate" style={panelStyle}>
        <div className="panel-heading">
          Competition Live Update
        </div>
        <div className="panel-body" >
          {compUpdate}
        </div>
      </div>

    </div>
  );
}

export default ArenaInformation;
