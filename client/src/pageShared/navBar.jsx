import React from 'react';
import { Link } from 'react-router';

const NavBar = (props) => (
  <nav className="navbar navbar-default navbar-fixed">
  <div className="container">
    <div className="navbar-header">
      <Link to="/dashboard">
        <h3 className="navbar-text">Murmillo</h3>
      </Link>
    </div>
    <div className ="navbar-right">
    {props.user.username ?
      <div>
        <p className="navbar-text">{'Logged in as ' + props.user.username}</p>
        <button className="btn btn-default navbar-btn" onClick={() => props.signOut()}>SIGN OUT</button>
      </div>
      :
      <Link to='/signup' className="btn btn-default navbar-btn btn-md">SIGN IN</Link>
    }
    </div>
  </div>
</nav>
);

export default NavBar;
