import React from 'react';
import RoomList from './roomList.jsx';

const Dashboard = (props) => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-6">
        <RoomList />
      </div>
      <div className="col-md-6">Something else?</div>
    </div>
  </div>
);

export default Dashboard;