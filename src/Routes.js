import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import Containers from './containers';
import Components from './components';
let { App } = Containers;
let { IndexComponent } = Components;

const routes = 
    <Route path="/" component={App}>
        <IndexRedirect to="indexComponent" />
        <Route path="indexComponent" component={IndexComponent}></Route>
    </Route>;

export default routes;