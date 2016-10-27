import React, { Component } from 'react';


export default class PersonAvatar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={this.props.className}>
                <img src={this.props.src} className='avatar' />
            </div>
        );
    }
}