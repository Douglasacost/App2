import React, { Component } from 'react';

export default class Button extends Component {
    render(){
        let {className, text, icon} = this.props;
        return <button className={className}>{text || icon}</button>;
    }
}