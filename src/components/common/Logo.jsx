import React, { Component } from 'react';

export default class Button extends Component {
    render(){
        let {className, size} = this.props;
        return <div className="Box-logo">
            <img style={{width: size || 50, height: size || 50}} src="../../assets/images/sample.png" alt="" />
        </div>;
    }
}