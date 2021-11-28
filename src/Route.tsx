import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Home from "./component/Home";
import OrderBook from "./component/OrderBook";
import OrderPlacement from "./component/OrderPlacement";
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';

export default function AppRoute() {
    return (
        <Router>
            <div>
                <Navbar bg="dark" expand="lg" variant="dark">
                    <Navbar.Brand href="#">
                        <img
                          alt=""
                          src="/logo192.png"
                          width="30"
                          height="30"
                          className="d-inline-block align-top"
                        />{' '}
                       Chinese Chess 
                    </Navbar.Brand>
                    <Nav className="mx-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/order-placement">Order Placement</Nav.Link>
                        <Nav.Link href="/order-book">Order Book</Nav.Link>
                    </Nav>
                </Navbar>
                <hr />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/order-placement">
                        <OrderPlacement />
                    </Route>
                    <Route path="/order-book">
                        <OrderBook />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}