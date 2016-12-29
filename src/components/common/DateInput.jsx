import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { setField } from '../../actions/Actions';

//import CSS
require('react-datepicker/dist/react-datepicker.css');


class DateInput extends Component {
    constructor(props) {
        super(props);
    }
    handleChange(date) {
        let form = this.props.form,
            input = this.props.input;
        let stringDate = date.toISOString();
        this.props.setField(form, input, stringDate);
    }
    render() {
        let defaultClasses = 'DateInput ';
        let className = this.props.className;
        let classes = defaultClasses.concat(className);
        let id = this.props.id;
        let label = this.props.label;
        let stringDate = this.props.stringDate;
        let disabled;
        let date;
        if (!stringDate) {
            date = '';
        } else {
            date = moment(stringDate);
        }
        if (this.props.disabled === true) {
            disabled = true;
        } else {
            disabled = false;
        }
        return (
            <div id={id} className={classes}>
                <span className='DateInput-label'>{label}</span>
                <DatePicker
                    todayButton={"Hoy"}
                    selected={date}
                    onChange={this.handleChange.bind(this)}
                    disabled={disabled} />
            </div>
        );
    }
}

export default connect(null, { setField })(DateInput);