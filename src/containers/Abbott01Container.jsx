import React from 'react';
import { connect } from 'react-redux';
import Components from '../components';
let { Abbott01 } = Components;

const mapStateToProps = (state) => { 
    return {
        abbott01: state.get('abbott01')
    };
};

export default connect(mapStateToProps)(Abbott01);