import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import { setUser, updateUser } from './actions/actions.js';
import { Router, Route, Link, browserHistory, IndexRoute} from 'react-router';
import murmilloApp from './reducers/reducers.js';
import App from './components/app.jsx';
import Dashboard from './components/dashboard.jsx';


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
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Dashboard} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);