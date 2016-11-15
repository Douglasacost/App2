import React, { Component } from 'react';
import { RadioGroup, Radio  } from 'react-mdl';
import { connect } from 'react-redux';
import { setField } from '../../actions/Actions';


class RadioInput extends Component {
    constructor(props) {
        super(props);
    }
    handleChange(e){
        let value = e.currentTarget.value,
            form = this.props.form,
            input = this.props.name;
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
        return (
            <div className={classes}>
                <span className='Form-radioLabel'>{label}</span>
                <div className='Form-radioOptions'>
                    {options.map(function(option, i){
                        return (
                            <div key={i}>
                                <input type="radio" name="site_name" 
                                        value={option} 
                                        checked={option === selected} 
                                        onChange={handleChange} />
                                <span>{option}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default connect(null, { setField })(RadioInput);