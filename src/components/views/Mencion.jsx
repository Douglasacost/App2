import React, { Component } from 'react';
import Components from '../common';
let {Button, Box, Content, Logo} = Components;

export default class Mencion extends Component {
    render(){
        return <div className="Container">
            <Box>
                <Content>
                    <div className="Box-logo--innerbox"><Logo size={80} /></div>
                    <Box className="Box-box"/>
                </Content>
                <Content>
                    <div className="Box-textbox"><code>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</code></div>
                </Content>
            </Box>
        </div>;
    }
}