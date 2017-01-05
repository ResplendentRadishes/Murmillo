import React from 'react';
import Axios from 'axios';
import RoomList from './roomList.jsx';
import Chatroom from './chatroom.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      roomList: []
    };
  }

  componentDidMount() {
    let context = this;
    Axios.get('/api/compList')
    .then(res => {
      context.setState({
        roomList: res.data
      });
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-5">
            <RoomList roomList={this.state.roomList}/>
          </div>
          <div className="col-md-7">
            <Chatroom />
          </div>
        </div>
      </div>
    )
  }
};

export default Dashboard;
