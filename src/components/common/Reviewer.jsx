import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import TextInput from '../common/TextInput';
import RadioInput from '../common/RadioInput';

class Reviewer extends Component {
    constructor(props) {
        super(props);
    }
    handleChange(date) {
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
                <span className='Form-dateLabel'>{label}</span>
                <TextInput label='' className='Form-textInput'/>
                <TextInput label='Firma:' className='Form-textInput'/>
                <div className='Form-dateInput'>
                    <span className='Form-dateLabel'>Fecha:</span>
                    <DatePicker
                        todayButton={"Hoy"}
                        selected={date}
                        onChange={this.handleChange.bind(this)} />
                </div>
                <RadioInput 
                    label='' 
                    name='revision'
                    selected=''
                    options={review}/>
                <TextInput label='Condiciones para aprobacion (si aplica):' className='Form-textInput'/>
            </div>
        );
    }
}

const review = [ 'APROBADO', 'RECHAZADO'];

export default connect(null)(Reviewer);