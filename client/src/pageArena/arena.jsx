import React from 'react';
import { connect } from 'react-redux';

import ArenaInformation from './arenaInformation.jsx';
import TimerContainer from './timerContainer.jsx';
import CodeContainer from './codeContainer.jsx';
import { socketEmitProblem } from '../socketHandler.js';

require ('../styles/arena.css');

// ===============================================
// CSS Stylying
const titleStyle = {
  margin: '0px'
};
const spinnerDivStyle = {
  paddingTop: 100,
  width: '100%',
  position: 'absolute',
  zIndex: 1
};
const spinnerImgStyle = {
  display: 'block',
  height: 200,
  width: 200,
  margin: 'auto',
};

// ===============================================
const mapStateToProps = (state) => {
  return {
    room: state.room,
    problem: state.problem,
    status: state.competition.status,
    compUpdate: state.competition.compUpdate,
  }
}

// ===============================================
// Use React component to emit'problem' once using componentDidMount
class Arena extends React.Component {
  constructor(props) {
    super(props);
  };

  // start counter when after component is mounted
  componentDidMount() {
    // emit 'problem' event to server
    socketEmitProblem(this.props.room.name, this.props.room.problemId);
  }

  render() {
    // when problem is not loaded, display spinner
    const spinner = this.props.problem.id ?
        <div></div>
        :
        <div style={spinnerDivStyle}>
          <img src="./gears.gif" alt="" style={spinnerImgStyle}></img>
        </div>;

    // when problem is loaded, display arena container
    const container = this.props.problem.id ?
         <div className="container">
          <h1 style={titleStyle}>{this.props.problem.title}</h1>
          <div className="row arenaRow">
            <div className="col-md-5 arenaInformation">
              <ArenaInformation desc={this.props.problem.prompt}
                                status={this.props.status}
                                compUpdate={this.props.compUpdate}/>
            </div>
            <div className="col-md-7 codeContainer">
              <TimerContainer />
              <CodeContainer />
            </div>
          </div>
        </div>
        :
        <div></div>;

    return (
      <div>
        {spinner}
        {container}
      </div>
    );
  };

};
Arena = connect(
  mapStateToProps
)(Arena);

export default Arena;
