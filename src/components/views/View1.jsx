import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Components from '../common';
let {Button, Box, Content} = Components;

export default class View1 extends Component {
    render(){
        return <div className="Container">
            <Box>
            <Content />
            <Content>
                <div className="Box-content--middle">
                    <Button className="mui-btn" text="PLAY" />
                    <Link to="/secondView">
                        <Button className="mui-btn" text="OK" />
                    </Link>
                </div>
            </Content>
        </Box>
        </div>;
    }
}