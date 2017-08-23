import React, { Component } from 'react';
import Components from '../common';
let {Button, Box, Content, Logo} = Components;

export default class View2 extends Component {
    render(){
        return <div className="Container">
            <Box nonStyle>
                <Content>
                    <Logo size={80} />
                </Content>
            </Box>
        </div>;
    }
}