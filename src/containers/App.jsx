import React, { Component } from 'react';
import { connect } from 'react-redux';
import Components from '../components';
import { Link } from 'react-router-dom';
let { View1 } = Components;
const normal = ( children ) => (
    <div className="Container">
        <Link className="" to="firstView"><button className="mui-btn">START</button></Link>
        {children}
    </div>
);

const App = ({ children }) => {
    return normal(children);
}

export default connect()(App);