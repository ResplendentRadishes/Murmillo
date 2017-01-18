import { connect } from 'react-redux';
import { updateCompOutOfTime } from '../actions/actions.js'
import Timer from './timer.jsx'

// ===============================================
const mapStateToProps = (state) => {
  return {
    room: state.room,
    problem: state.problem,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCompOutOfTime: function(outOfTime) {
      dispatch(updateCompOutOfTime(outOfTime));
    }
  }
}

const TimerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer);

// ===============================================
export default TimerContainer;

