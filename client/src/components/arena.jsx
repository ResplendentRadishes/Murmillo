import React from 'react';
import CodeContainer from '../containers/codeContainer.jsx';
import ArenaInformation from './arenaInformation.jsx';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    problem: state.problem,
    status: state.competition.status
  }
}

let Arena = (props) => {
  return (
    <div className="container-fluid">
      <h1>{props.problem.title}</h1>
      <div className="row">
        <div className="col-md-5">
          <ArenaInformation desc={props.problem.prompt} status={props.status}/>
        </div>
        <div className="col-md-7">
          <CodeContainer code={props.problem.template}/>
        </div>
      </div>
    </div>
  );
}

Arena = connect(
  mapStateToProps
)(Arena);

export default Arena;
