import { connect } from 'react-redux';
import { updateMessages } from '../actions/actions.js';
import Chatroom from '../components/chatroom.jsx';

const mapStateToProps = (state) => {
  return {
    room: state.room
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMessages: function(message) {
      dispatch(updateMessages(message));
    }
  }
}

const ChatroomContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chatroom);

export default ChatroomContainer;