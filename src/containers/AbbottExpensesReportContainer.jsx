import React from 'react';
import { connect } from 'react-redux';
import Components from '../components';
let { AbbottExpensesReport } = Components;

const mapStateToProps = (state) => { 
    return {
        abbottExpensesReport: state.get('abbottExpensesReport')
    };
};

export default connect(mapStateToProps)(AbbottExpensesReport);