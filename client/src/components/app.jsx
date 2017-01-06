import React from 'react';
import NavBarContainer from '../containers/navBarContainer.jsx';

const App = (props) => (
  <div>
    <NavBarContainer />
    {props.children}
  </div>
);

export default App;