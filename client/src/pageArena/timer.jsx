import React from 'react';
import { Link } from 'react-router';
import { hashHistory } from 'react-router';
import { socketClosePrevRoom } from '../socketHandler.js';

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
  return 'Time Remaning: '+min+' mins '+sec+ ' sec';
};
// displayMessage when user runs out of time
const displayMessage = (time) => {
  return time === 0 ? 'You are out of time, you are being redirected' : '';
};

// ===============================================
class Timer extends React.Component {
  constructor(props) {
    super(props);

    // begin local state with 20 mins as default
    // (update local state when fetching is done in componentWillReceiveProps)
    this.state = {
      timeRemaining: 1200,
    };
  };

  // start counter when after component is mounted
  componentDidMount() {
    this.timerID = setInterval(() => {
     this.tick();
    }, 1000);
  }

  // clearTimer when component dismount
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // update local state when fetching is complete (props will be updated)
  componentWillReceiveProps(nextProps) {
    // note nextProps = problem object
    this.state = {
      timeRemaining: nextProps.problem.timelimit,
    };
  }

  // on every tick, update local state
  tick() {
    var newTimeRemaing = this.state.timeRemaining - 1;
    this.setState( {timeRemaining: newTimeRemaing} );

    // when user is out of time,
    // remove interval, close socket, redirect, and update room in redux
    if (newTimeRemaing === 0 ) {
      clearInterval(this.timerID);

      // take 3 seconds do the following
      setTimeout(() => {
        socketClosePrevRoom(this.props.room);
        hashHistory.push('/dashboard');

        this.props.setRoom( {room: {}} );
      }, 3000);
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