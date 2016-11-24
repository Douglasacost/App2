import React from 'react';
import { connect } from 'react-redux';
import Components from '../components';
import { setFormData, setField } from '../actions/Actions';
let { AbbottExpensesReport } = Components;

const mapStateToProps = (state) => { 
    return {
        abbottExpensesReport: state.get('abbottExpensesReport'),
        user: state.get('user')
    };
};

export default connect(mapStateToProps, { setFormData, setField })(AbbottExpensesReport);