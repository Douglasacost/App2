import React, { Component } from 'react';
import Components from '../common';
let {Button, Box, Content, Logo} = Components;

export default class View2 extends Component {
    render(){
        return <div className="Container">
            <Box>
                <Content>
                    <Logo />
                </Content>
            </Box>
        </div>;
    }
}