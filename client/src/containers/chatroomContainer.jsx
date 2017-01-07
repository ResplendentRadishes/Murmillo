import { connect } from 'react-redux';
import { updateMessages, setProblem } from '../actions/actions.js';
import Chatroom from '../components/chatroom.jsx';

const mapStateToProps = (state) => {
  return {
    user: state.user,
    room: state.room,
    problem: state.problem
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMessages: function(message) {
      dispatch(updateMessages(message));
    },
    setProblem: function(problem) {
      dispatch(setProblem(problem));
    }
  }
}

const ChatroomContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chatroom);

export default ChatroomContainer;