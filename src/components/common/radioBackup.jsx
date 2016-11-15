import React, { Component } from 'react';
import { RadioGroup, Radio  } from 'react-mdl';
import { connect } from 'react-redux';
import { setField } from '../../actions/Actions';


class RadioInput extends Component {
    constructor(props) {
        super(props);
    }
    componentDidUpdate(){
        let radioInput = document.getElementsByName(this.props.name);
        console.log(radioInput);
        for(var i = 0; i < radioInput.length; i++){
            if(radioInput[i].value === this.props.selected){
                console.log(this.props.selected);
                radioInput[i].checked = true;
            }
        }
    }
    handleChange(){
        let radioInput = document.getElementsByName(this.props.name),
            value,
            form = this.props.form,
            input = this.props.name;
        console.log(radioInput);
        for(var i = 0; i < radioInput.length; i++){
            if(radioInput[i].checked){
                value = radioInput[i].value;
            }
        }
        console.log(value);
        this.props.setField(form, input, value);
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
        let handleChange = this.handleChange.bind(this);
        console.log('render radioInput');
        console.log(selected);
        return (
            <div className={classes}>
                <span className='Form-radioLabel'>{label}</span>
                <div className='Form-radioOptions'>
                    <RadioGroup name={name} id={id} value={selected}>
                        {options.map(function(option, i){
                            return <Radio value={option} key={i} onClick={handleChange} ripple>{option}</Radio>;
                        })}
                    </RadioGroup>
                </div>
            </div>
        );
    }
}

export default connect(null, { setField })(RadioInput);