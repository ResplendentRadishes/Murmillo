import React from 'react';
import { socketJoinRoom, socketClosePrevRoom } from '../socketHandler.js';

const RoomEntry = (props) => {

  const joinClickHandler = () => {
      // close clientSocket connection for previous room
      socketClosePrevRoom(props.currRoom);

      // open clientSocket connection for selected room
      socketJoinRoom(props.room.name, props.username || 'Tester', (serverMessage) => {
        props.updateMessages(serverMessage);
      });

      // update currtent room using redux
      props.updateCurrentRoom(props.room);
  };

  return (
    <div>
      <div className="panel panel-default">
        <div className="panel-heading">
          {props.room.name}
        </div>
        <div className="panel-body">
          <div className="col-md-8">
            <p className="roomDescript">{props.room.desc}</p>
          </div>
          <div className="col-md-4 text-right no-gutter">
            <button
              type="button"
              className="btn btn-success btn-primary btn-md"
              onClick={joinClickHandler}
            >JOIN ROOM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default RoomEntry;