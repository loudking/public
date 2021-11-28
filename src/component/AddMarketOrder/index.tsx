import React from "react";

import { DataModel } from "../../types/Instrument";
import AddOrder from "../Common/AddOrder";
import { OrderTypes } from "../../types/Order";

/**
 * Add market order props
 */
interface AddMarketOrderProps {
    show: boolean;
    handleClose: () => void;
    onSubmit: (values: any) => void;
    instrument: DataModel;
}

/**
 * Add market order modal window - call common modal window with showPriceField = false
 * @param props Add market order props
 */
export default function AddMarketOrder(props: AddMarketOrderProps) {
    return (
      <AddOrder
        title="Add Market Order"
        show={props.show}
        handleClose={props.handleClose}
        onSubmit={props.onSubmit}
        instrument={props.instrument}
        type={OrderTypes[1]}
        showPriceField={false}
      />
    );
}