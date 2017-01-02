import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { setUser } from './actions/actions.js';
import murmilloApp from './reducers/reducers.js';

let store = createStore(murmilloApp);
console.log(store.getState());
store.dispatch(setUser({username: 'Murm'}));
console.log(store.getState());

const App = (props) => (
  <div>
    App
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));