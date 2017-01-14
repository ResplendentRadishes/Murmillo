import React from 'react';
import {
          socketClosePrevRoom,
          socketEmitJoin,
          socketOnPlayerList,
          socketOnMsg,
          socketOnProblem,
          socketOnSubmission,
          socketOnUpdate
        } from '../socketHandler.js';


const RoomEntry = (props) => {

  const joinClickHandler = () => {
      // close clientSocket connection for previously selected room
      socketClosePrevRoom(props.currRoom);
      // emit join event
      socketEmitJoin(props.room.name, props.username);

      // configure all clientSocketListeners to Redux through action function
      socketOnMsg(props.room.name, (serverMessage) => {
        props.updateMessages(serverMessage);  //action
      });
      socketOnPlayerList(props.room.name, (playerList) => {
        props.updatePlayerList(playerList);  //action
      });
      socketOnProblem(props.room.name, (problem) => {
        props.setProblem(problem);            //action
      });
      socketOnSubmission(props.room.name, (result) => {
        props.receiveCodeCheck(result);       //action
      });
      socketOnUpdate(props.room.name, (update) => {
        props.getCompUpdate(update);          //action
      });

      // update currtent room using redux
      props.setRoom(props.room);
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