import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import { setUser } from './actions/actions.js';
import murmilloApp from './reducers/reducers.js';
import App from './components/app.jsx';


let store = createStore(murmilloApp);
console.log(store.getState());
store.dispatch(setUser({username: 'Murm'}));
console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);