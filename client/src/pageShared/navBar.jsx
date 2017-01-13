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
              <p className="navbar-text">{'Logged in as ' + this.props.user.username.split(' ')[0]}</p>
              {this.props.user.avatarUrl ? 
                <img style={{height: 36, width: 36}} src={this.props.user.avatarUrl} />
                :
                ''
              }
              <button className="btn btn-default navbar-btn" style={{marginLeft: 7, marginRight: 7}} onClick={() => this.props.signOut()}>SIGN OUT</button>
            </div>
            :
            <Link to='/signup' className="btn btn-default navbar-btn btn-md" style={{marginLeft: 7, marginRight: 7}}>SIGN IN</Link>
          }
          </div>
        </div>
      </nav>
    );
  }
}
export default NavBar;
