import React from 'react';
import { Link } from 'react-router';

const NavBar = (props) => (
  <nav className="navbar navbar-default">
  <div className="container-fluid">
    <div className="navbar-header">
      <Link to="/">
        <h3 className="navbar-text">Murmillo</h3>
      </Link>
      <Link to="/arena">
        <h5 className="navbar-text">Super Secret Dev Link</h5>
      </Link>
    </div>
    {props.user.username ? 
      'Logged in as ' + props.user.username : 
      <button type="button" className="btn btn-default navbar-btn navbar-right">Sign in</button>
    }
  </div>
</nav>
);

export default NavBar;