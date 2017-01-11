import { connect } from 'react-redux';
import { setRoomList } from '../actions/actions.js';
import RoomList from './roomList.jsx';

const mapStateToProps = (state) => {
  return {
    roomList: state.roomList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setRoomList: function(roomList) {
      dispatch(setRoomList(roomList));
    }
  }
}

const RoomListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomList);

export default RoomListContainer;
