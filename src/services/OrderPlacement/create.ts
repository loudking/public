import { CreateOrderPlacement, OrderPlacementConstructor, OrderPlacementConstructorArgs } from "./interface";

const createOrderPlacementService: CreateOrderPlacement = function(
    ctor: OrderPlacementConstructor,
    opts: OrderPlacementConstructorArgs
) {
    return new ctor(opts);
};

export default createOrderPlacementService;