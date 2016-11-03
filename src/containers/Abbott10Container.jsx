import React from 'react';
import { connect } from 'react-redux';
import Components from '../components';
let { Abbott10 } = Components;

const mapStateToProps = (state) => { 
    return {
        abbott10: state.get('abbott10')
    };
};

export default connect(mapStateToProps)(Abbott10);