import React from 'react';
import RoomListContainer from '../containers/roomListContainer.jsx';
import ChatroomContainer from '../containers/chatroomContainer.jsx';

const Dashboard = (props) => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-5">
        <RoomListContainer />
      </div>
      <div className="col-md-7">
        {props.currentRoom.name ? <ChatroomContainer /> : <div></div>}
      </div>
    </div>
  </div>
);

export default Dashboard;