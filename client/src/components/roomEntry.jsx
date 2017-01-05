import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { setRoom } from '../actions/actions.js';
import { joinRoom } from '../socketHandler.js';

var user = {
  username: 'tester'
};

var RoomEntry = (props) => (
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
              joinRoom(props.room.name, user.username);
              props.dispatch(setRoom(props.room))}}
          >Join Room
          </button>
        </div>
      </div>
    </div>
  </div>
);

RoomEntry = connect()(RoomEntry);

export default RoomEntry;