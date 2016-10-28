import React, { Component } from 'react';
import { Textfield } from 'react-mdl';


export default class TextInput extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let className = this.props.className;
        let id = this.props.id;
        let label = this.props.label;
        return (
            <Textfield
                onChange={() => {}}
                label={label}
                inputClassName={className}
                floatingLabel
                style={{width: '250px', display: 'block', marginBottom: '-20px'}}
            />
        );
    }
}