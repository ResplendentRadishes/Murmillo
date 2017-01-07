import { connect } from 'react-redux';
import { setRoom, updateMessages } from '../actions/actions.js';
import RoomEntry from '../components/roomEntry.jsx';

const mapStateToProps = (state, ownProps) => {
  return {
    room: ownProps.room
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMessages: function(message) {
      dispatch(updateMessages(message));
    },
    updateCurrentRoom: function(room) {
      dispatch(setRoom(room));
    }
  }
}

const RoomContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomEntry);

export default RoomContainer;
