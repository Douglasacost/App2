import React from 'react';
import { connect } from 'react-redux';
import Components from '../components';
let { AbbottExcepcionCompra } = Components;

const mapStateToProps = (state) => { 
    return {
        abbottExcepcionCompra: state.get('abbottExcepcionCompra')
    };
};

export default connect(mapStateToProps)(AbbottExcepcionCompra);