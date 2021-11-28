import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import AddLimitOrder from "../AddLimitOrder";
import AddMarketOrder from "../AddMarketOrder";
import { DataModel } from "../../types/Instrument";

/**
 * Add order button props
 */
interface AddOrderButtonProps {
    isButtonDisabled: boolean,
    onSubmit: (values: any) => void,
    instrument: DataModel
}

/**
 * Add order button - a dropdown list with two entries, each of which is for different orders
 * @param props Add order button props
 */
export default function AddOrderButton(props: AddOrderButtonProps) {
    const [showLimitOrder, setShowLimitOrder] = React.useState(false);

    const handleLimitOrderClose = () => setShowLimitOrder(false);
    const handleLimitOrderShow = () => setShowLimitOrder(true);

    const [showMarketOrder, setShowMarketOrder] = React.useState(false);

    const handleMarketOrderClose = () => setShowMarketOrder(false);
    const handleLimitMarketShow = () => setShowMarketOrder(true);

    return (
        <>
        <ButtonGroup>
            <DropdownButton as={ButtonGroup} title="Add Order" id="bg-nested-dropdown" disabled={props.isButtonDisabled}>
                <Dropdown.Item eventKey="1" onClick={handleLimitOrderShow}>Limit</Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={handleLimitMarketShow}>Market</Dropdown.Item>
            </DropdownButton>
        </ButtonGroup>
        <AddLimitOrder
            show={showLimitOrder}
            handleClose={handleLimitOrderClose}
            onSubmit={props.onSubmit}
            instrument={props.instrument}/>
        <AddMarketOrder
            show={showMarketOrder}
            handleClose={handleMarketOrderClose}
            onSubmit={props.onSubmit}
            instrument={props.instrument}
        />
      </>
    );
}