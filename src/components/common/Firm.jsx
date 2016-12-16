import React, { Component } from 'react';
import { connect } from 'react-redux';
import DateInput from './DateInput';
import moment from 'moment';
import { setField } from '../../actions/Actions';
import TextInput from '../common/TextInput';

class FirmInput extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { className, id, label, stringDate, form, input, user, solicitante, labelFecha } = this.props;
        let defaultClasses = 'Firm-container Firm ';
        let classes = defaultClasses.concat(className);
        let today = moment();
        return (
            <div id={id} className={classes}>
                <span className='Firm-label'>{label}</span>
                <span className='Firm-label'><u>{(solicitante !== undefined && solicitante !== null && solicitante !== '') ? solicitante : user }</u></span>
                <DateInput className='' 
                    label={(labelFecha !== undefined && labelFecha!== null) ? labelFecha : 'Fecha:'} 
                    stringDate={(stringDate !== undefined && stringDate !== null && stringDate !== '') ? moment(stringDate) : today } 
                    input=''
                    form=''
                    disabled={true} />
            </div>
        );
    }
}

export default connect(null, { setField })(FirmInput);