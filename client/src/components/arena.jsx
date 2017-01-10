import React from 'react';
import CodeContainer from '../containers/codeContainer.jsx';
import ArenaInformation from './arenaInformation.jsx';
import { connect } from 'react-redux';
require ('../styles/arena.css');

// ===============================================
// CSS Stylying
const titleStyle = {
  margin: '0px'
}

// ===============================================

let Arena = (props) => {
  return (
    <div className="container">
      <h1 style={titleStyle}>{props.problem.title}</h1>
      <div className="row arenaRow">
        <div className="col-md-5 arenaInformation">
          <ArenaInformation desc={props.problem.prompt} status={props.status}/>
        </div>
        <div className="col-md-7 codeContainer">
          <CodeContainer />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    problem: state.problem,
    status: state.competition.status
  }
}

Arena = connect(
  mapStateToProps
)(Arena);

export default Arena;
