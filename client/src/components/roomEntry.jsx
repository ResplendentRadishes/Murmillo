import React from 'react';
import { joinRoom } from '../socketHandler.js';

var user = {
  username: 'tester'
};

const RoomEntry = (props) => (
  <div>
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">{props.room.name}</h3>
      </div>
      <div className="panel-body">
        <div className="col-md-8">
          <p>{props.room.desc}</p>
        </div>
        <div className="col-md-4 text-right no-gutter">
          <button 
            type="button" 
            className="btn btn-success btn-primary btn-lg" 
            onClick={() => {
              joinRoom(props.room.name, user.username, (serverMessage) => {
                props.updateMessages(serverMessage);
              });
              props.updateCurrentRoom(props.room);}}
          >Join Room
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default RoomEntry;