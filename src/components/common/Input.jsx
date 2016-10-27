import React, { Component } from 'react';


export default class Input extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        componentHandler.upgradeElement(this.refs.input , 'MaterialTextfield');        
    } 
    
    render() {
        let defaultClasses = 'mdl-textfield mdl-js-textfield ';
        let className = this.props.className;
        let classes = defaultClasses.concat(className);
        let id = this.props.id;
        let label = this.props.label;
        return (
            <div ref="input" className={classes}>
                <input id={id} className='mdl-textfield__input'>
                    {this.props.text}
                </input>
                <label className="mdl-textfield__label" htmlFor={id}>{label}</label>
            </div>
        );
    }
}