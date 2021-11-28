import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer, { State } from "./reducers";
import rootSaga from "./sagas";
import { ServicesType } from "../services/types";

export default function configureStore(services: ServicesType, initialState?: Partial<State>) {
    const sagaMiddleware = createSagaMiddleware();

    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENTIONS_COMPOSE__ || compose;
    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(sagaMiddleware))
    );
    sagaMiddleware.run(rootSaga, services);

    return store;
}