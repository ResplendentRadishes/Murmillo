import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import { setUser, updateUser } from './actions/actions.js';
import murmilloApp from './reducers/reducers.js';
import App from './components/app.jsx';


let store = createStore(murmilloApp);
// console.log(store.getState());
// store.dispatch(setUser({username: 'Murm'}));
// console.log(store.getState());
// store.dispatch(updateUser({score: 0}));
// console.log(store.getState());
// store.dispatch(updateUser({score: 20}));
// console.log(store.getState());
// store.dispatch(setUser({username: 'Murmillo'}));
// console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);