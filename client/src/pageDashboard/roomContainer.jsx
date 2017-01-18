import { connect } from 'react-redux';
import  {
          setRoom,
          setUser,            // used with socketOnScoreUpdate
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
    user: state.user,
    currRoom: state.room,
    room: ownProps.room
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setRoom: function(room) {
      dispatch(setRoom(room));
    },
    setUser: function(user) {
      dispatch(setUser(user));
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
