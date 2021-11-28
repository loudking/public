import React from "react";

import { DataModel } from "../../types/Instrument";
import AddOrder from "../Common/AddOrder";
import { OrderTypes } from "../../types/Order";

/**
 * Add limit order props
 */
interface AddLimitOrderProps {
    show: boolean;
    handleClose: () => void;
    onSubmit: (values: any) => void;
    instrument: DataModel;
}

/**
 * Add limit order modal window - call common modal window with showPriceField = true
 * @param props Add limit order props
 */
export default function AddLimitOrder(props: AddLimitOrderProps) {
    return (
        <AddOrder
            title="Add Limit Order"
            show={props.show}
            handleClose={props.handleClose}
            onSubmit={props.onSubmit}
            instrument={props.instrument}
            type={OrderTypes[0]}
            showPriceField={true}
      />
    );
}