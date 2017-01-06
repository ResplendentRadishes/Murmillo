import { connect } from 'react-redux';
import { resetMessages } from '../actions/actions.js';
import Chatroom from '../components/chatroom.jsx';

const mapStateToProps = (state) => {
  return {
    room: state.room,
    messages: ['You have entered ' + state.room.name]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // updateCode: function(text) {
    //   dispatch(setCode(text));
    // },
    // submitCode: function() {
    //   dispatch(sendCode());
    // }
    resetMessages: function() {
      dispatch(resetMessages());
    }
  }
}

const ChatroomContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chatroom);

export default ChatroomContainer;