import React from 'react';
import { connect } from 'react-redux';
import Components from '../components';
import { setFormData, setField } from '../actions/Actions';
let { AbbottObjetivosActividad } = Components;

const mapStateToProps = (state) => { 
    return {
        formState: state.get('abbottObjetivosActividad'),
        user: state.get('user')
    };
};

export default connect(mapStateToProps, { setFormData, setField })(AbbottObjetivosActividad);