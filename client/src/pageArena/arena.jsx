import React from 'react';
import { connect } from 'react-redux';

import ArenaInformation from './arenaInformation.jsx';
import TimerContainer from './timerContainer.jsx';
import CodeContainer from './codeContainer.jsx';
import { resetProblem, resetCompetition } from '../actions/actions.js';
import { socketEmitProblem } from '../socketHandler.js';
import { Link } from 'react-router';

require ('../styles/arena.css');

// ===============================================
// CSS Stylying
const popupStyle = {
  margin: '0px'
};
const spinnerDivStyle = {
  paddingTop: 100,
  width: '100%',
  position: 'absolute',
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
    competition: state.competition
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    resetProblem: function() {
      dispatch(resetProblem());
    },
    resetCompetition: function() {
      dispatch(resetCompetition());
    }
  }
}
// ===============================================
// Use React component to emit'problem' once using componentDidMount
class Arena extends React.Component {
  constructor(props) {
    super(props);
  };

  componentWillMount() {
    // reset problem state and competition state
    this.props.resetProblem();
    this.props.resetCompetition();

  }

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
          <div className="row arenaRow">
            <div className="col-md-5 arenaInformation">
              <ArenaInformation problem={this.props.problem}
                                competition={this.props.competition}/>
            </div>
            <div className="col-md-7 codeContainer">
              <TimerContainer />
              <CodeContainer />
            </div>
          </div>
        </div>
        :
        <div></div>;

    // when user has submitted correct solution, display options
    const allPassingComp = this.props.competition.allPassing ?
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 style={popupStyle}>You Completed the Problem</h4>
              <Link to='/dashboard' className='btn btn-success btn-primary btn-md'>
                Go To Previuos Page?
              </Link>
              <Link to='/stats' className='btn btn-info btn-primary btn-md'>
                Go To Your Stats Page?
              </Link>
            </div>
          </div>
        </div>
        :
        <div></div>;

    // when user has run out of time solution, display options
    const outOfTimeComp = this.props.competition.outOfTime && !this.props.competition.allPassing?
    // const allPassingComp = true ?
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 style={popupStyle}>Competition has ended. You can continue to work on the problem if you would like</h4>
              <Link to='/dashboard' className='btn btn-success btn-primary btn-md'>
                Go To Previuos Page?
              </Link>
              <Link to='/signup' className='btn btn-info btn-primary btn-md'>
                Go To Your Stats Page?
              </Link>
            </div>
          </div>
        </div>
        :
        <div></div>;

    return (
      <div>
        {allPassingComp}
        {outOfTimeComp}
        {container}
        {spinner}
      </div>
    );
  };

};
Arena = connect(
  mapStateToProps,
  mapDispatchToProps
)(Arena);

export default Arena;