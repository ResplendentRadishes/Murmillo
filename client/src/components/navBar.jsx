import React from 'react';

const NavBar = (props) => (
  <nav className="navbar navbar-default">
  <div className="container-fluid">
    <div className="navbar-header">
      <a href="#">
        <h3 className="navbar-text">Murmillo</h3>
      </a>
    </div>
    <button type="button" className="btn btn-default navbar-btn navbar-right">Sign in</button>
  </div>
</nav>
);

export default NavBar;