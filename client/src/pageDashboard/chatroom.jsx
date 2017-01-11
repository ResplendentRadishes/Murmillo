import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router';
import { socketEmitProblem, socketEmitMsg } from '../socketHandler.js';

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
    // emit 'problem' event to server
    socketEmitProblem(room.name, room.problemId);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="col=md-8">
        <div className="panel panel-default">
          <div className="panel-heading">
            {this.props.room.name}
          </div>
          <div className="panel-body conversation fixed-panel" style={{maxHeight: 400, minHeight:400}}>
            {this.props.room.messages.map((message, index) =>
              <div className="chatMessage" key={index}>{message}</div>
            )}
          </div>
          <div className="panel-footer">
            <div className="input-group">
              <span className="input-group-btn">
                <Link to="/arena">
                    <button
                      className="btn btn-success btn-md"
                      onClick={this.handleReadyButton}
                    > READY </button>
                </Link>
              </span>
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
                  onClick={() => this.handleMessageSend()}
                >
                  SEND
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