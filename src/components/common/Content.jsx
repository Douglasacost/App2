import React, { Component } from 'react';

export default class Button extends Component {
    render(){
        let {className, children} = this.props;
        return <div className={"Box-content " + className || "Box-content"}>{children}</div>;
    }
}