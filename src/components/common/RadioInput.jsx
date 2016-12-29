import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setField } from '../../actions/Actions';


class RadioInput extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        let selected = this.props.selected;
        if (selected === undefined || selected === null || selected === ''){
            let value = this.props.options[0];
            this.props.setField(this.props.location, this.props.name, value);
        }
    }
    handleChange(e){
        let value = e.currentTarget.value,
            location = this.props.location,
            input = this.props.name;
        this.props.setField(location, input, value);
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
                <span className='Radio-label'>{label}</span>
                <div className='Radio-options'>
                    {options.map(function(option, i){
                        return (
                            <div className='Radio-option' key={i}>
                                <input type="radio" name={name} 
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