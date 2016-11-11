import React, { Component } from 'react';
import { Textfield } from 'react-mdl';

export default class NumberInput extends Component {
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
                    pattern="-?[0-9]*(\.[0-9]+)?"
                    error="Ingrese un numero."
                    floatingLabel
                />
            </div>
        );
    }
}