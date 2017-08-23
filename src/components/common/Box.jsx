import React, { Component } from 'react';

export default class Button extends Component {
    render(){
        let {className, children, nonStyle, style} = this.props;
        style = nonStyle ? {backgroundColor: 'white', border: 'none'} : style;
        return <div style={style} className={"Box " + className || "Box"}>{children}</div>;
    }
}