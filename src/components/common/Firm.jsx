import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { setDate } from '../../actions/Actions';
import TextInput from '../common/TextInput';

class DateInput extends Component {
    constructor(props) {
        super(props);
        let startDate = moment();
        this.props.setDate(startDate);
    }
    handleChange(date) {
        this.props.setDate(date);
    }
    
    render() {
        let defaultClasses = 'Firm-container ';
        let className = this.props.className;
        let classes = defaultClasses.concat(className);
        let id = this.props.id;
        let label = this.props.label;
        let date = this.props.date;
        return (
            <div id={id} className={classes}>
                <TextInput label={label} className='Form-textInput'/>
                <TextInput label='Firma:' className='Form-textInput'/>
                <div className='Form-dateInput'>
                    <span className='Form-dateLabel'>Fecha:</span>
                    <DatePicker
                        todayButton={"Hoy"}
                        selected={date}
                        onChange={this.handleChange.bind(this)} />
                </div>
            </div>
        );
    }
}

export default connect(null, { setDate })(DateInput);