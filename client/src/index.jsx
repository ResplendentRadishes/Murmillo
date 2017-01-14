import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import murmilloApp from './reducers/reducers.js';
import createLogger from 'redux-logger';

import { Provider } from 'react-redux'
import { Router, Route, browserHistory, hashHistory, IndexRoute} from 'react-router';
import App from './pageShared/app.jsx';
import DashboardContainer from './pageDashboard/dashboardContainer.jsx';
import Arena from './pageArena/arena.jsx';
import SignUp from './pageSignup/signUp.jsx';
import Home from './pageHome/home.jsx';
import UserContainer from './pageProfile/userCardContainer.jsx';

const logger = createLogger()

let store = createStore(murmilloApp, undefined, applyMiddleware(logger));
// let store = createStore(murmilloApp);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='dashboard' component={DashboardContainer} />
        <Route path='arena' component={Arena} />
        <Route path='signup' component={SignUp} />
        <Route path='profile' component={UserContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
