import React from 'react';
import { BrowserRouter, Route, Link, IndexRedirect, Switch } from 'react-router-dom';
import Containers from './containers';
import Components from './components';
let { App, RespondeContainer, MencionContainer, EsperandoContainer } = Containers;

const routes = 
    <BrowserRouter>
        <div>
            <li>
                <Link to={`/Responde`}>
                Responde
                </Link>
            </li>
            <li>
                <Link to={`/Mencion`}>
                Mencion
                </Link>
            </li>
            <li>
                <Link to={`/Esperando`}>
                Esperando
                </Link>
            </li>    
            <Route exact path="/" component={App} />
            <Route path="/Responde" component={RespondeContainer} />
            <Route path="/Mencion" component={MencionContainer} />
            <Route path="/Esperando" component={EsperandoContainer} />
        </div>
    </BrowserRouter>;

export default routes;