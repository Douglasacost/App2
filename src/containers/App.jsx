import React, { Component } from 'react';
import { connect } from 'react-redux';
import Components from '../components';

let { Header } = Components;

const normal = ( children ) => (
    <div>
        <Header/>
        {children}
    </div>
);

const App = ({ children }) => {
    return normal(children);
}

export default connect()(App);