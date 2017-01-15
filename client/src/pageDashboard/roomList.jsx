import React from 'react';
import RoomContainer from './roomContainer.jsx';
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
    });
  }

  render() {
    return (
      <div className="container">
        {this.state.roomList.map((room, index) =>
          <RoomContainer key={index} room={room} />
        )}
      </div>
    );
  }
}

export default RoomList;