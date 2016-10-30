import React, { Component } from 'react';
import { connect } from 'react-redux';

const normal = ( children ) => (
    <div>
        {children}
    </div>
);

const App = ({ children }) => {
    return normal(children);
}

export default connect()(App);