import React from 'react';
import { connect } from 'react-redux';
import Components from '../components';
import { setFormData, setField } from '../actions/Actions';
let { ComponentA } = Components;

const mapStateToProps = (state) => { 
    return {
        state: state.get('ComponentA'),
        user: state.get('User')
    };
};

export default connect(mapStateToProps, { setFormData, setField })(ComponentA);