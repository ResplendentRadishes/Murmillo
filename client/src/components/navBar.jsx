import React from 'react';
import { Link } from 'react-router';

const NavBar = (props) => (
  <nav className="navbar navbar-default">
  <div className="container-fluid">
    <div className="navbar-header">
      <Link to="/">
        <h3 className="navbar-text">Murmillo</h3>
      </Link>
    </div>
    <div className ="navbar-right">
    {props.user.username ?
      <div>
        <p className="navbar-text">{'Logged in as ' + props.user.username}</p> 
        <button className="btn btn-default navbar-btn" onClick={() => props.signOut()}>Sign out</button> 
      </div>
      :
      <Link to='/signup' className="btn btn-default navbar-btn">Sign in</Link>
    }
    </div>
  </div>
</nav>
);

export default NavBar;
