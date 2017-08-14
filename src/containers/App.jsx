import React, { Component } from 'react';
import { connect } from 'react-redux';

const normal = ( children ) => (
    <div>
        <h1>Hello world!</h1>
        {children}
    </div>
);

const App = ({ children }) => {
    return normal(children);
}

export default connect()(App);