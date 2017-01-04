import React from 'react';
import RoomEntry from './roomEntry.jsx';

const roomList = (props) => (
  <div className="container-fluid">
    {props.roomList.map(room => 
      <RoomEntry room={room}/>
    )}
  </div>
);

export default roomList;