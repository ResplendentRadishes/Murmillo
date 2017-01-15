import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import murmilloApp from './reducers/reducers.js';
import createLogger from 'redux-logger';

import { Provider } from 'react-redux'
import { Router, Route, browserHistory, hashHistory, IndexRoute} from 'react-router';
import App from './pageShared/app.jsx';
import DashboardContainer from './pageDashboard/dashboardContainer.jsx';
import GraphContainer from './userStatistics/graphContainer.jsx';
import Arena from './pageArena/arena.jsx';
import SignUp from './pageSignup/signUp.jsx';
import Home from './pageHome/home.jsx';
import Statistics from './pageStatistics/statistics.jsx';


const logger = createLogger()

let store = createStore(murmilloApp, undefined, applyMiddleware(logger));
// let store = createStore(murmilloApp);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='showGraphs' component={GraphContainer} />
        <Route path='dashboard' component={DashboardContainer} />
        <Route path='arena' component={Arena} />
        <Route path='signup' component={SignUp} />
        <Route path='stats' component={Statistics} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
