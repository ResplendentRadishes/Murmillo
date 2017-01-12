import { connect } from 'react-redux';
import { setRoom } from '../actions/actions.js'
import Timer from './timer.jsx'

// ===============================================
const mapStateToProps = (state) => {
  return {
    room: state.room,
    problem: state.problem
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setRoom: function(roomObj) {
      dispatch(setRoom(roomObj));
    }
  }
}

const TimerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer);

// ===============================================
export default TimerContainer;

