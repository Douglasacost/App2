import React, { Component } from 'react';
import { Textfield } from 'react-mdl';

export default class TextBoxInput extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let { className, id, name, rows } = this.props;
        let classes = 'Form-textAreaBox ';
        if (className) {
            classes = classes.concat(className);
        }
        rows = parseInt(rows);
        return (
            <div className={classes}>
                <Textfield
                    onChange={() => {}}
                    label=''
                    id={id}
                    name={name}
                    inputClassName={className}
                    rows={rows}
                />
            </div>
        );
    }
}