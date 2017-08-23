import React, { Component } from 'react';
import Components from '../common';
let {Button, Box, Content, Logo} = Components;

export default class Esperando extends Component {
    render(){
        return <div className="Container">
            <Box>
                <Content>
                    <Logo size={80} />
                </Content>
            </Box>
        </div>;
    }
}