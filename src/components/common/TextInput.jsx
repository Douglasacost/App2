import React, { Component } from 'react';


export default class TextInput extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let defaultClasses = 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label ';
        let className = this.props.className;
        let classes = defaultClasses.concat(className);
        let id = this.props.id;
        let label = this.props.label;
        return (
            <div ref={(input) => this.textInput = input} className={classes}>
                <input id={id} className='mdl-textfield__input'>
                </input>
                <label className="mdl-textfield__label" htmlFor={id}>{label}</label>
            </div>
        );
    }
}