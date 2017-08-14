// Importing npm packages
import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import createBrowserHistory from 'history/createBrowserHistory'
const newHistory = createBrowserHistory();

// importing custom packages
import reducers from './reducers';
import remoteActionMiddleware from './middleware/RemoteActionMiddleware';
import { setState } from './actions/Actions';
import state from './State';
import routes from './Routes';

// importing css
require("./assets/stylesheets/app.scss");

injectTapEventPlugin();

const middleware = [ remoteActionMiddleware ];

const store = createStore(
    reducers,
    middleware
);

store.dispatch(setState(state));
render(
        <Provider store={store}>
            <Router history={newHistory}>{routes}</Router>
        </Provider>,
    document.getElementById('app')
);