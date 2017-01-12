import React from 'react';
import { connect } from 'react-redux';

import ArenaInformation from './arenaInformation.jsx';
import TimerContainer from './timerContainer.jsx';
import CodeContainer from './codeContainer.jsx';
require ('../styles/arena.css');

// ===============================================
// CSS Stylying
const titleStyle = {
  margin: '0px'
}

// ===============================================
const mapStateToProps = (state) => {
  return {
    problem: state.problem,
    status: state.competition.status,
    compUpdate: state.competition.compUpdate,
  }
}

let Arena = (props) => {
  return (
    <div className="container">
      <h1 style={titleStyle}>{props.problem.title}</h1>
      <div className="row arenaRow">
        <div className="col-md-5 arenaInformation">
          <ArenaInformation desc={props.problem.prompt} status={props.status} compUpdate={props.compUpdate}/>
        </div>
        <div className="col-md-7 codeContainer">
          <TimerContainer />
          <CodeContainer />
        </div>
      </div>
    </div>
  );
}

Arena = connect(
  mapStateToProps
)(Arena);

export default Arena;
