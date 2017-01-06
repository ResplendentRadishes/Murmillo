import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import murmilloApp from './reducers/reducers.js';
import createLogger from 'redux-logger';

import { Provider } from 'react-redux'
import { Router, Route, browserHistory, hashHistory, IndexRoute} from 'react-router';
import App from './components/app.jsx';
import DashboardContainer from './containers/dashboardContainer.jsx';
import Arena from './components/arena.jsx';

const logger = createLogger()

let store = createStore(murmilloApp, undefined, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={DashboardContainer} />
        <Route path='arena' component={Arena} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
