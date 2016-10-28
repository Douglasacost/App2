import React, { Component } from 'react';
import { RadioGroup, Radio  } from 'react-mdl';


export default class RadioInput extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let defaultClasses = 'Form-radioContainer ';
        let className = this.props.className;
        let classes = defaultClasses.concat(className);
        let id = this.props.id;
        let label = this.props.label;
        let name = this.props.name;
        return (
            <div className={classes}>
                <span className='Form-radioLabel'>{label}</span>
                <RadioGroup name={name} value="Si">
                    <Radio value="Si">Si</Radio>
                    <Radio value="No" ripple>No</Radio>
                </RadioGroup>
            </div>
        );
    }
}