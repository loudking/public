import React from "react";
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';

interface SelectRowTableProps {
    id?: string,
    data: any[],
    columns: ColumnDescription[],
    setSelectedRow: (selectedRow: any) => void;
}

export default function SelectRowTable(props: SelectRowTableProps) {
    const [selectedRow, setSelectedRow] = React.useState({});

    const rowEvents = {
      onClick: (e: any, row: any, rowIndex: number) => {
          if (row === selectedRow) {
              setSelectedRow({});
          }
          else {
            setSelectedRow(row)
          }
          props.setSelectedRow(row);
      },
    };
    const rowStyle = (row: any, rowIndex: number) => {
        if (row === selectedRow) {
            return {
                backgroundColor: 'cyan',
                fontWeight: 'bold' as 'bold'
            }
        }
        return {}
    }
    return (
        <BootstrapTable
            id={props.id}
            keyField='id'
            data={props.data}
            columns={props.columns}
            striped
            hover
            condensed
            rowEvents={rowEvents}
            rowStyle={rowStyle}
        />
    );
}