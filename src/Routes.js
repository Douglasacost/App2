import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Containers from './containers';
let { GroupsContainer,
    App,
    Abbott01Container} = Containers;

const routes = 
    <Route path="/" component={App}>
        <Route path="abbott01" component={Abbott01Container}></Route>
    </Route>;

export default routes;