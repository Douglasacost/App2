import React, { Component } from 'react';
import Components from '../common';
let {Button, Box, Content, Logo} = Components;

export default class Responde extends Component {
    render(){
        return <div className="Container">
            <Box>
                <Content>
                    <div className="Box-logo--innerbox"><Logo size={80} /></div>
                </Content>
                <Content>
                    <div className="Box-textbox"><code>{this.props.message}.</code></div>
                </Content>
            </Box>
        </div>;
    }
}