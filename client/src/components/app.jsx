import React from 'react';
import NavBar from './navBar.jsx';

const App = (props) => (
  <div>
    <NavBar />
    {props.children}
  </div>
);

export default App;