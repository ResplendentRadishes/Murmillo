import React from 'react';
import { Link, hashHistory } from 'react-router';
import Axios from 'axios';
require('../styles/navbar.css');


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
          // get user profile from DB
          context.props.setUser(res.data);
          hashHistory.push('/dashboard');
          // get user stat from DB (currenlty serving fake data)
          // Axios.get('/user/stats/' + res.data.id)
          // .then(res2 => {
          //   context.props.setUserStat(res2.data);
          // })

        } else {
          hashHistory.push('/');
        }
      });
    }
  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed">
        <div className="container">
          <div className="navbar-header">
            <Link to={this.props.user.username ? "/dashboard" : "/"}>
              <h3 className="navbar-text">Murmillo</h3>
            </Link>
          </div>
          <div className ="navbar-right" >

          {this.props.user.username ?
            <div>
           <p className="navbar-text ">{'Logged in as ' + this.props.user.username.split(' ')[0]}</p>
              {this.props.user.avatarUrl ?
                <Link to='/stats'>
                  <img style={{height: 36, width: 36}} src={this.props.user.avatarUrl} />
                </Link>
                :
                ''
              }

              <button className="btn btn-default navbar-btn"  onClick={() => this.props.signOut()}>SIGN OUT</button>
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
