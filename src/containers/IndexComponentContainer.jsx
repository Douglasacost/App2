import React from 'react';
import { connect } from 'react-redux';
import Components from '../components';
import { setField } from '../actions/Actions';
let { IndexComponent } = Components;

const mapStateToProps = (state) => { 
    return {
        state: state.get('IndexComponent'),
        user: state.get('User')
    };
};

export default connect(mapStateToProps, { setField })(IndexComponent);