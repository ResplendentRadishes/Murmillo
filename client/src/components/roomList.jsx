import React from 'react';
import RoomEntry from './roomEntry.jsx';
var rooms = [{
  name: 'hard',
  desc: 'This is tough yo'
},
{
  name: 'medium',
  desc: 'Not that bad'
},
{
  name: 'easy',
  desc: 'Really?'
}];

const roomList = (props) => (
  <div className="container-fluid">
    {rooms.map(room => 
      <RoomEntry room={room}/>
    )}
  </div>
);

export default roomList;