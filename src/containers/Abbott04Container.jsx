import React from 'react';
import { connect } from 'react-redux';
import Components from '../components';
let { Abbott04 } = Components;

const mapStateToProps = (state) => { 
    return {
        abbott04: state.get('abbott04')
    };
};

export default connect(mapStateToProps)(Abbott04);