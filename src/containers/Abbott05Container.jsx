import React from 'react';
import { connect } from 'react-redux';
import Components from '../components';
let { Abbott05 } = Components;

const mapStateToProps = (state) => { 
    return {
        abbott05: state.get('abbott05')
    };
};

export default connect(mapStateToProps)(Abbott05);