import React from 'react';
import { connect } from 'react-redux';
import Components from '../components';
let { Abbott06 } = Components;

const mapStateToProps = (state) => { 
    return {
        abbott06: state.get('abbott06')
    };
};

export default connect(mapStateToProps)(Abbott06);