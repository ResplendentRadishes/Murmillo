import React from 'react';
import Axios from 'axios';
// import { Link } from 'react-router';
import { hashHistory } from 'react-router';
import { Link } from 'react-router';

import { socketEmitMsg, socketEmitReady } from '../socketHandler.js';

// ===============================================
// CSS Stylying
const pStyle = {
  fontSize: 18,
  padding: 'none'
}
// ===============================================

class Chatroom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };
    this.handleMessageSend = this.handleMessageSend.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleReadyButton = this.handleReadyButton.bind(this);
  }

  handleMessageSend() {
    const context = this;
    // emit 'message' event to server
    socketEmitMsg(this.props.room.name, this.props.user.username, this.state.message);

    // updates current message to blank after message is sent
    this.setState({
      message: ''
    });
  }

  handleMessageChange(event) {
    // sets the current message into the state
    this.setState({
      message: event.target.value
    });
  }

  handleKeyPress(target) {
    if (target.charCode === 13) {
      this.handleMessageSend();
    }
  }

  handleReadyButton() {
    const context = this;
    const room = this.props.room;
    // emit 'ready' event to server
    socketEmitReady(room.name, room.problemId);
  }

  componentDidMount() {

  }

  render() {
    let playerNames = [];
    let playersNotReady = [];
    let allReady;
    // playerList = [{username: 'username', ready: true}, {}, {} .....]
    // display playerList to users
    if (this.props.room.playerList !== undefined) {
      playerNames = this.props.room.playerList.map((userObj) => {
                          return userObj.username;
                        });
      playersNotReady = this.props.room.playerList.reduce((acc, userObj) => {
                          if (userObj.ready === true) return acc;
                          else return acc.concat(userObj.username);
                        }, []);
      allReady = playersNotReady.length === 0 ? true : false;
    }

    return (
      <div className="col=md-8">
        <div className="panel panel-default">

          {/* ------ ChatRoomHeading ------ */}
          <div className="panel-heading">
            <div className="row">
              <div className="col-md-9">
                <div> { 'You are currently in room: '
                        + this.props.room.name.toUpperCase() } </div>
                <div style={pStyle}>
                  { 'Players in the room: ' + playerNames.join(', ')}
                </div>
                { !allReady ?
                  <div style={pStyle}>
                    { 'Waiting for ' + playersNotReady.join(', ') + ' to be ready.'}
                  </div>
                : <div style={pStyle}>
                  Everyone is ready. Click Start.
                  </div> }

              </div>
              <div className="col-md-3">
                <button
                  className="btn btn-success btn-md"
                  onClick={this.handleReadyButton}
                > Ready </button>
                { allReady ?
                  <Link to='/arena' className='btn btn-info btn-primary btn-md'>
                    START
                  </Link>
                  : <div></div> }
              </div>
            </div>
          </div>

          {/* ------ ChatRoomBody ------ */}
          <div className="panel-body conversation fixed-panel" style={{maxHeight: 400, minHeight:400}}>
            {this.props.room.messages.map((message, index) =>
              <div className="chatMessage" key={index}>
                {message}
              </div>
            )}
          </div>

          {/* ------ ChatRoomFooter ------ */}
          <div className="panel-footer">
            <div className="input-group">
              <input
                type="text"
                id="chatMessage"
                className="form-control"
                placeholder="Enter Message"
                value={this.state.message}
                onChange={this.handleMessageChange}
                onKeyPress={this.handleKeyPress}
              />
              <span className="input-group-btn">
                <button
                  className="btn btn-info btn-md"
                  type="button"
                  onClick={() => this.handleMessageSend()} >
                  Send
                </button>
              </span>
            </div>
          </div>

        </div>
      </div>
    )
  }
};

export default Chatroom;