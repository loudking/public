import React from "react";
import { ColumnDescription } from 'react-bootstrap-table-next';

import { DataModel } from "../../types/OrderBook";
import SelectRowTable from "../Common/SelectRowTable";

/**
 * Order book table props
 */
interface OrderBookTableProps {
    data: DataModel[];
    setSelectedRow: (selectedRow: DataModel) => void;
}
/**
 * Order book table - show 4 columns: id, is open, instrument id an instrument name
 * @param props Order book table props
 */
export default function OrderBookTable(props: OrderBookTableProps) {
    const columns: ColumnDescription[] = [
        {
            dataField: 'id',
            text: 'Id'
        },
        {
            dataField: 'isOpen',
            text: 'is Open?'
        },
        {
            dataField: 'instrument.id',
            text: 'Instrument id'
        },
        {
            dataField: 'instrument.name',
            text: 'Instrument name'
        },
    ];

    return (
        <SelectRowTable
            id="order-book-table"
            data={props.data}
            columns={columns}
            setSelectedRow={props.setSelectedRow}
        />
    );
}