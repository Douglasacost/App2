import React from 'react';
import { BrowserRouter, Route, Link, IndexRedirect, Switch } from 'react-router-dom';
import Containers from './containers';
import Components from './components';
let { App, View1Container, View2Container } = Containers;


const Home = () => (
    <div>
      <h2>Home</h2>
    </div>
  )
const routes = 
    <BrowserRouter>
        <div>
            <li>
                <Link to={`/firstView`}>
                    HOME
                </Link>
            </li>
            <Route exact path="/" component={App} />
            <Route path="/firstView" component={View1Container} />
            <Route path="/secondView" component={View2Container} />
        </div>
    </BrowserRouter>;

export default routes;