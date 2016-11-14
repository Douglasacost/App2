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
        let { className, id, label, stringDate, form, input } = this.props;
        let defaultClasses = 'Firm-container ';
        let classes = defaultClasses.concat(className);
        return (
            <div id={id} className={classes}>
                <TextInput label={label} className='Firm-textInput'/>
                <TextInput label='Firma:' className='Firm-textInput'/>
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