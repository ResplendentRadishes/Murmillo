import React from 'react';
import { Link } from 'react-router';
import { hashHistory } from 'react-router';
import { socketClosePrevRoom, socketEmitProblem } from '../socketHandler.js';

// ===============================================
// CSS Stylying
const timerStyle = {
  fontSize: '20px'
};
const messageStyle = {
  fontSize: '20px'
};
const panelStyle = {
  // height: '200px',
  margin: '0px'
};
// ===============================================
// displayTime in '1 min 10 sec' format
const displayTime = (time) => {
  var min = Math.floor( time / 60 );
  var sec = time % 60;

  return time === undefined || time <= 0 ?
        'Time Remaning: ' :
        'Time Remaning: '+min+' mins '+sec+ ' sec' ;
};

// ===============================================
// Use React component to start timer using componentDidMount
class Timer extends React.Component {
  constructor(props) {
    super(props);

    // local state used for timer
    this.state = {
      timeRemaining: undefined,
    };
  };

  // start counter when after component is mounted
  componentDidMount() {
    // set timeRemaning state
    const timelimit = this.props.problem.timelimit;
    const dateStamp = new Date(this.props.problem.dateStamp);
    const now = new Date();
    const diff = now - dateStamp;
    this.state = {
      timeRemaining: timelimit - Math.floor(diff/1000),
    };

    // start timer
    this.timerID = setInterval(() => {
     this.tick();
    }, 1000);
  }

  // clearTimer when component dismounts
  componentWillUnmount() {
    console.log('unmounting********')
    clearInterval(this.timerID);
  }

  // on every tick, update local state
  tick() {
    var newTimeRemaing = this.state.timeRemaining - 1;
    this.setState( {timeRemaining: newTimeRemaing} );

    // when user is out of time,
    if (newTimeRemaing <= 0 ) {
      clearInterval(this.timerID);
      this.props.updateCompOutOfTime(true);
    }
  }

  render() {
    return (
      <div>
        <div className="panel panel-default descriptionPanel" style={panelStyle}>
          <div className="panel-heading">
            { displayTime(this.state.timeRemaining) }
          </div>
        </div>
      </div>
    );
  };
};


export default Timer;