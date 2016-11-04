import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import Containers from './containers';
import Components from './components';
let { App,
    Abbott01Container,
    Abbott02Container,
    Abbott04Container,
    Abbott05Container,
    Abbott06Container,
    Abbott10Container,
    AbbottExcepcionCompraContainer } = Containers;

let { FormsList } = Components;

const routes = 
    <Route path="/" component={App}>
        <IndexRedirect to="formslist" />
        <Route path="formslist" component={FormsList}></Route>
        <Route path="abbott01" component={Abbott01Container}></Route>
        <Route path="abbott02" component={Abbott02Container}></Route>
        <Route path="abbott04" component={Abbott04Container}></Route>
        <Route path="abbott05" component={Abbott05Container}></Route>
        <Route path="abbott06" component={Abbott06Container}></Route>
        <Route path="abbott10" component={Abbott10Container}></Route>
        <Route path="abbottExcepcionCompra" component={AbbottExcepcionCompraContainer}></Route>
    </Route>;

export default routes;