import React from 'react';
import { Link } from 'react-router';
import Axios from 'axios';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.user.username) {
      Axios.get('/loginStatus')
      .then(res => {
        let newUser = {
          username: res.data.profile.displayName,
          avatarUrl: res.data.profile.photos[0].value
        };
        this.props.setUser(newUser);
      })
    }
  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to={this.props.user.username ? "/dashboard" : "/"}>
              <h3 className="navbar-text">Murmillo</h3>
            </Link>
          </div>
          <div className ="navbar-right">
          {this.props.user.username ?
            <div>
              <p className="navbar-text">{'Logged in as ' + this.props.user.username}</p>
              <button className="btn btn-default navbar-btn" onClick={() => this.props.signOut()}>SIGN OUT</button>
            </div>
            :
            <Link to='/signup' className="btn btn-default navbar-btn btn-md">SIGN IN</Link>
          }
          </div>
        </div>
      </nav>
    );
  }
}
export default NavBar;
