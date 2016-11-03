import React from 'react';
import { connect } from 'react-redux';
import Components from '../components';
let { Abbott02 } = Components;

const mapStateToProps = (state) => { 
    return {
        abbott02: state.get('abbott02')
    };
};

export default connect(mapStateToProps)(Abbott02);