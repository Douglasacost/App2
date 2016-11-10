import React, { Component } from 'react';
import { RadioGroup, Radio  } from 'react-mdl';


export default class RadioInput extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let defaultClasses = 'Radio-container ';
        let className = this.props.className;
        let classes = defaultClasses.concat(className);
        let label = this.props.label;
        let id = this.props.id;
        let name = this.props.name;
        let options = this.props.options;
        let selected = this.props.selected;
        return (
            <div className={classes}>
                <span className='Form-radioLabel'>{label}</span>
                <div className='Form-radioOptions'>
                    <RadioGroup name={name} id={id} value={selected}>
                        {options.map(function(option, i){
                            return <Radio value={option} key={i} ripple>{option}</Radio>;
                        })}
                    </RadioGroup>
                </div>
            </div>
        );
    }
}