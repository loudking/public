import { all } from "redux-saga/effects";

import orderBookSaga from "./orderbook";
import orderPlacementSaga from "./orderplacement";

import { ServicesType } from "../../services/types";

export default function* rootSaga(services: ServicesType) {
    const allSaga = [
        ...orderBookSaga({ OrderBook: services.OrderBook }),
        ...orderPlacementSaga({ OrderPlacement: services.OrderPlacement }),
    ];
    yield all(allSaga);
}