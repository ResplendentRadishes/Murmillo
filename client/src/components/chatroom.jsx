import React from 'react';
import Axios from 'axios';

class Chatroom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      messages: ['You have entered "hard"'],
      room: {
        name: 'hard',
        desc: 'This is tough yo'
      },
      users: [
        {
          username: 'Bob'
        },
        {
          username: 'Not Bob'
        }
      ]
    };
    this.handleMessageSend = this.handleMessageSend.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleMessageSend() {
    this.setState({
      messages: [ ...this.state.messages, this.state.message],
      message: ''
    });
  }

  handleMessageChange(event) {
    this.setState({
      message: event.target.value
    });
  }

  handleKeyPress(target) {
    if (target.charCode===13) {
      this.handleMessageSend();
    }
  }

  componentDidMount() {
    console.log('chatroom props', this.props)
  }

  render() {
    return (
      <div className="col=md-8">
        <div className="panel panel-default">
          <div className="panel-heading">
            {this.props.room.name}
          </div>
          <div className="panel-body" style={{maxHeight: 600, minHeight:600}}>
            {this.props.messages.map((message, index) => 
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