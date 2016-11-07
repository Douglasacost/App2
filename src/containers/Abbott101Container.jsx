import React from 'react';
import { connect } from 'react-redux';
import Components from '../components';
let { Abbott101 } = Components;

const mapStateToProps = (state) => { 
    return {
        abbott101: state.get('abbott101')
    };
};

export default connect(mapStateToProps)(Abbott101);