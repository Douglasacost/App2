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
        let { className, id, label, stringDate, form, input, user, approbador, approbado } = this.props;
        let defaultClasses = 'Firm-container ';
        let classes = defaultClasses.concat(className);
        return (
            <div id={id} className={classes}>
                <span className='Firm-label'>{label}</span>
                { (approbador) ?
                    <span className='Firm-label'><u>{approbador}</u></span>
                    :
                    <span className='Firm-label'><u>{user}</u></span>
                }
                <DateInput className='' 
                    label='Fecha:' 
                    stringDate={stringDate} 
                    form={form} 
                    input={input} />
                { (approbado) &&
                    <span className='Firm-approvedImages'>approbado</span>
                }
            </div>
        );
    }
}

export default connect(null, { setField })(FirmInput);