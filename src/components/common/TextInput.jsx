import React, { Component } from 'react';
import { Textfield } from 'react-mdl';

export default class TextInput extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let { className, id, label, name } = this.props;
        return (
            <div className={className}>
                <Textfield
                    onChange={() => {}}
                    label={label}
                    id={id}
                    name={name}
                    floatingLabel
                />
            </div>
        );
    }
}