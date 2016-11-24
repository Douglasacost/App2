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
    Abbott101Container,
    Abbott11Container,
    AbbottExcepcionCompraContainer,
    AbbottObjetivosActividadContainer,
    AbbottExpensesReportContainer } = Containers;

let { FormsList } = Components;

const routes = 
    <Route path="/" component={App}>
        <IndexRedirect to="formslist" />
        <Route path="formslist" component={FormsList}></Route>
        <Route path="abbott01(/:id)" component={Abbott01Container}></Route>
        <Route path="abbott02(/:id)" component={Abbott02Container}></Route>
        <Route path="abbott04(/:id)" component={Abbott04Container}></Route>
        <Route path="abbott05(/:id)" component={Abbott05Container}></Route>
        <Route path="abbott06(/:id)" component={Abbott06Container}></Route>
        <Route path="abbott10(/:id)" component={Abbott10Container}></Route>
        <Route path="abbott10-1(/:id)" component={Abbott101Container}></Route>
        <Route path="abbott11(/:id)" component={Abbott11Container}></Route>
        <Route path="abbottExcepcionCompra(/:id)" component={AbbottExcepcionCompraContainer}></Route>
        <Route path="AbbottObjetivosActividad(/:id)" component={AbbottObjetivosActividadContainer}></Route>
        <Route path="AbbottExpensesReport" component={AbbottExpensesReportContainer}></Route>
    </Route>;

export default routes;