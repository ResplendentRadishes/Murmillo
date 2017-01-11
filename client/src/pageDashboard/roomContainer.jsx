import { connect } from 'react-redux';
import  {
          setRoom,
          updateMessages,     // used with socketOnMsg
          setProblem,         // used with socketOnProblem
          receiveCodeCheck,   // used with socketOnSubmission
          getCompUpdate       // used with socketOnUpdate
        } from '../actions/actions.js';

import RoomEntry from './roomEntry.jsx';

const mapStateToProps = (state, ownProps) => {
  return {
    username: state.user.username,
    currRoom: state.room,
    room: ownProps.room
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setRoom: function(room) {
      dispatch(setRoom(room));
    },
    updateMessages: function(serverMessage) {
      dispatch(updateMessages(serverMessage));
    },
    setProblem: function(problem) {
      dispatch(setProblem(problem));
    },
    receiveCodeCheck: function(result) {
      dispatch(receiveCodeCheck(result));
    },
    getCompUpdate: function(update) {
      dispatch(getCompUpdate(update));
    },
  }
}

const RoomContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomEntry);

export default RoomContainer;
