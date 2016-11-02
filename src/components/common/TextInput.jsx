import React, { Component } from 'react';
import { Textfield } from 'react-mdl';

export default class TextInput extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let { className, id, label } = this.props;
        return (
            <Textfield
                onChange={() => {}}
                label={label}
                inputClassName={className}
                floatingLabel
            />
        );
    }
}