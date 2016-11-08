import React from 'react';
import { connect } from 'react-redux';
import Components from '../components';
let { AbbottObjetivosActividad } = Components;

const mapStateToProps = (state) => { 
    return {
        abbottObjetivosActividad: state.get('abbottObjetivosActividad')
    };
};

export default connect(mapStateToProps)(AbbottObjetivosActividad);