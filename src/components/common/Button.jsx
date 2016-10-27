import React, { Component } from 'react';


export default class Button extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let defaultClasses = 'MainButton mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent ';
        let className = this.props.className;
        let classes = defaultClasses.concat(className);
        return (
            <button onClick={this.props.onClick} className={classes}>
                {this.props.text}
            </button>
        );
    }
}