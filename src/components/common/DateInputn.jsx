import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

//import CSS
require('react-datepicker/dist/react-datepicker.css');

let defaultClasses = 'dateInput-container ';

const DateInputn = ({ className, id, label, todayDate }) => (
    <div id={id} className={() => { return defaultClasses.concat({className}) }}>
        <span className='Form-dateLabel'>{label}</span>
        <DatePicker
            todayButton={"Hoy"}
            selected={todayDate} />
    </div>
);

export default DateInputn;