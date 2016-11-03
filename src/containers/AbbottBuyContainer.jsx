import React from 'react';
import { connect } from 'react-redux';
import Components from '../components';
let { AbbottBuy } = Components;

const mapStateToProps = (state) => { 
    return {
        abbottBuy: state.get('abbottBuy')
    };
};

export default connect(mapStateToProps)(AbbottBuy);