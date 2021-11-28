import React from "react";
import { Provider } from "react-redux";

import Route from "./Route";
import store from "./data/store";
import services from "./services";

export default function Providers() {
    return (
        <Provider store={store(services)}>
            <Route />
        </Provider>
    )
}