import React from "react";
import { ColumnDescription } from 'react-bootstrap-table-next';

import { LimitOrder } from "../../types/Order";
import SelectRowTable from "../Common/SelectRowTable";

/**
 * Order table props
 */
interface OrderTableProps {
    data: LimitOrder[];
    setSelectedRow: (selectedRow: LimitOrder) => void;
}

/**
 * Order table - show 5 columns: id, type, quantity, price and instrument id
 * @param props Order table props
 */
export default function OrderTable(props: OrderTableProps) {
    const columns: ColumnDescription[] = [
        {
            dataField: 'id',
            text: 'Id'
        },
        {
            dataField: 'type',
            text: 'Type'
        },
        {
            dataField: 'quantity',
            text: 'Quantity'
        },

        {
            dataField: 'price',
            text: 'Price'
        },
        {
            dataField: 'instrumentId',
            text: 'Instrument Id'
        },
    ];

    return (
        <SelectRowTable
            id="order-table"
            data={props.data}
            columns={columns}
            setSelectedRow={props.setSelectedRow}
        />
    );
}