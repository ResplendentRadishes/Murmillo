import { connect } from 'react-redux';
import { setRoom } from '../actions/actions.js';
import RoomEntry from '../components/roomEntry.jsx';

const mapStateToProps = (state, ownProps) => {
  return {
    room: ownProps.room
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
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
