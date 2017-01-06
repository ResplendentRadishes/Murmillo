import React from 'react';
import RoomListContainer from '../containers/roomListContainer.jsx';
import Chatroom from './chatroom.jsx';

const Dashboard = (props) => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-5">
        <RoomListContainer />
      </div>
      <div className="col-md-7">
        <Chatroom />
      </div>
    </div>
  </div>
);

export default Dashboard;