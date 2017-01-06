import 'babel-polyfill' //Promise polyfill

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import murmilloApp from './reducers/reducers.js';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import { Provider } from 'react-redux'
import { Router, Route, browserHistory, hashHistory, IndexRoute} from 'react-router';
import App from './components/app.jsx';
import Dashboard from './components/dashboard.jsx';
import Arena from './components/arena.jsx';

const logger = createLogger()

let store = createStore(murmilloApp, undefined, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Dashboard} />
        <Route path='arena' component={Arena} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
