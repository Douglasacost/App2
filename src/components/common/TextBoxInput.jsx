import React, { Component } from 'react';
import { Textfield } from 'react-mdl';

export default class TextBoxInput extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let { className, id, name, rows } = this.props;
        rows = parseInt(rows);
        return (
            <Textfield
                onChange={() => {}}
                label=''
                id={id}
                name={name}
                inputClassName={className}
                rows={rows}
            />
        );
    }
}