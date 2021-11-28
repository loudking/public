import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';

import { DataModel } from "../../types/Execution";

/**
 * Execution table props
 */
interface ExecutionTableProps {
    data: DataModel[];
}

/**
 * Execution table - three columns: id, quantity and defined price
 * @param props Execution table props
 */
export default function ExecutionTable(props: ExecutionTableProps) {
    const columns = [{
        dataField: 'id',
        text: 'Id'
    },
    {
        dataField: 'quantity',
        text: 'Quantity'
    },

    {
        dataField: 'definedPrice',
        text: 'Defined Price'
    },
    ];
    
    return (
        <BootstrapTable
            id="execution-table"
            keyField='id'
            data={props.data}
            columns={columns}
            striped
            hover
            condensed
        />
    );
}