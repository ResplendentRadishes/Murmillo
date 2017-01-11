import React from 'react';
import NavBarContainer from './navBarContainer.jsx';

const App = (props) => (
  <div>
    <NavBarContainer />
    {props.children}
  </div>
);

export default App;