import React from 'react';
import { connect } from 'react-redux';
import Components from '../components';
import { setFormData, setField } from '../actions/Actions';
let { Abbott04 } = Components;

const mapStateToProps = (state) => { 
    return {
        formState: state.get('abbott04'),
        user: state.get('user')
    };
};

export default connect(mapStateToProps, { setFormData, setField })(Abbott04);