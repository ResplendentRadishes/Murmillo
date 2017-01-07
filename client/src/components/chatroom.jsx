import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router';
import { readyToStart, sendChatMessage } from '../socketHandler.js';

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
    // sends message to redux
    const context = this;
    sendChatMessage(this.props.room.name, (this.props.user.username || 'Tester') + ': ' + this.state.message);
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
    readyToStart(room.name, room.problemId, (problem) => {
      context.props.setProblem(problem);
    });
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
          <div className="panel-body" style={{maxHeight: 600, minHeight:600}}>
            {this.props.room.messages.map((message, index) => 
              <p key={index}>{message}</p>
            )}
          </div>
          <div className="panel-footer">
            <Link to="/arena">
              <button 
                className="btn btn-success"
                onClick={this.handleReadyButton}
              > Ready </button>
            </Link>
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
                  className="btn btn-info" 
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