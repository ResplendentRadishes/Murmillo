import React from 'react';
import RoomContainer from '../containers/roomContainer.jsx';
import Axios from 'axios';

class RoomList extends React.Component {
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
      context.props.setRoomList(res.data);
      return res.data;
    }).then(roomList => {
      console.log(context.props.roomList, context.state.roomList);
    });
  }

  render() {
    return (
      <div className="container-fluid">
        {this.state.roomList.map((room, index) => 
          <RoomContainer key={index} room={room} />
        )}
      </div>
    );
  }
}

export default RoomList;