// Importing npm packages
import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

// importing custom packages
import reducers from './reducers';
import remoteActionMiddleware from './middleware/RemoteActionMiddleware';
import { setState } from './actions/Actions';
import state from './State';
import routes from './Routes';
import $ from 'jquery';

// importing css
require("./assets/stylesheets/app.scss");

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  appBar: {
    height: 80
  }
});

const middleware = [ remoteActionMiddleware ];

const store = createStore(
    reducers,
    middleware
);

try {
    _spPageContextInfo
    var userid= _spPageContextInfo.userId;
    var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getuserbyid(" + userid + ")";
    var requestHeaders = { "accept" : "application/json;odata=verbose" };
    $.ajax({
        url : requestUri,
        contentType : "application/json;odata=verbose",
        headers : requestHeaders,
        success : onSuccess,
        error : onError
    });
} catch(err) {
    store.dispatch(setState(state));
    render(
        <MuiThemeProvider muiTheme={muiTheme} >
            <Provider store={store}>
                <Router history={hashHistory}>{routes}</Router>
            </Provider>
        </MuiThemeProvider>,
        document.getElementById('app')
    );
}

function onSuccess(data, request){
    var displayName = data.d.Title;
    store.dispatch(setState(state.set(['user', 'displayName'], displayName)));
    render(
        <MuiThemeProvider muiTheme={muiTheme} >
            <Provider store={store}>
                <Router history={hashHistory}>{routes}</Router>
            </Provider>
        </MuiThemeProvider>,
        document.getElementById('app')
    );
}

function onError(error) {
    console.log(error);
}