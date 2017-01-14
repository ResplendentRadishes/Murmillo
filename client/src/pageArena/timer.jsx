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

// ===============================================
// displayTime in '1 min 10 sec' format
const displayTime = (time) => {
  var min = Math.floor( time / 60 );
  var sec = time % 60;

  return sec ? 'Time Remaning: '+min+' mins '+sec+ ' sec' : 'Time Remaning: ';
};
// displayMessage when user runs out of time
const displayMessage = (time) => {
  return time === 0 ? 'Competition has ended. You can still work on the problem, but you will not receive credit.' : '';
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

  // clearTimer when component dismount
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // on every tick, update local state
  tick() {
    var newTimeRemaing = this.state.timeRemaining - 1;
    this.setState( {timeRemaining: newTimeRemaing} );

    // when user is out of time,
    // remove interval, close socket, redirect, and update room in redux
    if (newTimeRemaing === 0 ) {
      clearInterval(this.timerID);

      // // take 3 seconds do the following
      // setTimeout(() => {
      //   socketClosePrevRoom(this.props.room);
      //   // hashHistory.push('/dashboard');

      //   this.props.setRoom( {room: {}} );
      // }, 3000);
    }
  }

  render() {
    return (
      <div>
        <div style={timerStyle}>
          { displayTime(this.state.timeRemaining) }
        </div>
        <div style={messageStyle}>
          { displayMessage(this.state.timeRemaining) }
        </div>
      </div>
    );
  };
};


export default Timer;