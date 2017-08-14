import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Containers from './containers';
import Components from './components';
let { App } = Containers;

const routes = 
    <BrowserRouter>
        <Route path="/" component={App}/>
    </BrowserRouter>;

export default routes;