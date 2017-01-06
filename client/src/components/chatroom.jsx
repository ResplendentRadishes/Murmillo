import React from 'react';
import Axios from 'axios';

class Chatroom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };
    this.handleMessageSend = this.handleMessageSend.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleMessageSend() {
    this.props.updateMessages(this.state.message);
    this.setState({
      message: ''
    });
  }

  handleMessageChange(event) {
    this.setState({
      message: event.target.value
    });
  }

  handleKeyPress(target) {
    if (target.charCode === 13) {
      this.handleMessageSend();
    }
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