import React from 'react';
import { connect } from 'react-redux';
import Components from '../components';
import { setFormData, setField } from '../actions/Actions';
let { Abbott01 } = Components;

const mapStateToProps = (state) => { 
    return {
        formState: state.get('abbott01'),
        user: state.get('user')
    };
};

export default connect(mapStateToProps, { setFormData, setField })(Abbott01);