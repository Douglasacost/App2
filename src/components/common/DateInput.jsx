import React, { Component } from 'react';
import DatePicker from './DatePicker';


export default class DateInput extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let defaultClasses = 'dateInput-container ';
        let className = this.props.className;
        let classes = defaultClasses.concat(className);
        let id = this.props.id;
        let label = this.props.label;
        return (
            <div id={id} className={classes}>
                <span className='Form-dateLabel'>{label}</span>
                <DatePicker />
            </div>
        );
    }
}