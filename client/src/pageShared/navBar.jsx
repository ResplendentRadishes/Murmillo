import React from 'react';
import { Link, hashHistory } from 'react-router';
import Axios from 'axios';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const context = this;
    if (!this.props.user.username) {
      Axios.get('/user/loginStatus')
      .then(res => {
        if (res.data) {
          Axios.get('/user/profile/' + res.data.profile.id)
          .then(res => {
            context.props.setUser(res.data);
            hashHistory.push('/dashboard');
          })
        } else {
          hashHistory.push('/');
        }
      });
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
                <Link to='/profile'>
                  <img style={{height: 36, width: 36}} src={this.props.user.avatarUrl} />
                </Link>
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
