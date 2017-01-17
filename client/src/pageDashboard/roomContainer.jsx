import { connect } from 'react-redux';
import  {
          setRoom,
          updatePlayerList,   // used with socketOnPlayerList
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
    updatePlayerList: function(playerList) {
      dispatch(updatePlayerList(playerList));
    },
    updateMessages: function(serverMessage) {
      dispatch(updateMessages(serverMessage));
    },
    setProblem: function(problem) {
      dispatch(setProblem(problem));
    },
    receiveCodeCheck: function(resultObj) {
      dispatch(receiveCodeCheck(resultObj));
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
