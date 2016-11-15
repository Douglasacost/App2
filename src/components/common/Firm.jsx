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
        let { className, id, label, stringDate, form, input, user } = this.props;
        let defaultClasses = 'Firm-container ';
        let classes = defaultClasses.concat(className);
        return (
            <div id={id} className={classes}>
                <span className='Firm-label'>{label}</span>
                <span className='Firm-label'><u>{user}</u></span>
                <DateInput className='' 
                    label='Fecha:' 
                    stringDate={stringDate} 
                    form={form} 
                    input={input} />
            </div>
        );
    }
}

export default connect(null, { setField })(FirmInput);