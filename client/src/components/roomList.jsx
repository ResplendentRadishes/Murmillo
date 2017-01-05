import React from 'react';
import RoomContainer from '../containers/roomContainer.jsx';

const roomList = (props) => (
  <div className="container-fluid">
    {props.roomList.map((room, index) => 
      <RoomContainer key={index} room={room} />
    )}
  </div>
);

export default roomList;