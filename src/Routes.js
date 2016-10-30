import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Containers from './containers';
import Components from './components';
let { GroupsContainer,
    App,
    Abbott01Container} = Containers;

let { FormsList } = Components;

const routes = 
    <Route path="/" component={App}>
        <IndexRoute component={FormsList}></IndexRoute>
        <Route path="abbott01" component={Abbott01Container}></Route>
    </Route>;

export default routes;