import React from 'react';
import { connect } from 'react-redux';
import Components from '../components';
let { Abbott11 } = Components;

const mapStateToProps = (state) => { 
    return {
        abbott11: state.get('abbott11')
    };
};

export default connect(mapStateToProps)(Abbott11);