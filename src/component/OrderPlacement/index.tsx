import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, ListGroup } from "react-bootstrap";
import Card from 'react-bootstrap/Card'

import { actions as orderPlacementActions } from "../../data/actions/orderplacement";
import { State } from "../../data/reducers";
import { OrderPlacementState } from "../../data/reducers/orderplacement";
import OrderBookTable from "../OrderBookTable";
import { DataModel } from "../../types/OrderBook";
import AddOrderButton from "../AddOrderButton";
import AddExecutionButton from "../AddExecutionButton";

/**
 * Order placement: window is divide into two parts (width=8:4)
 * 
 * Main part shows order book list and allow user to select a row and apply
 * further operations such as 'Add Order' and 'Add Execution'
 * 
 * Right part is a card showing execution result, including 'Last created
 * order id', 'Last created executions' and 'Last error'
 */
export default function OrderPlacement() {
  const emptyDataModel: DataModel = {
    id: -1,
    isOpen: false,
    instrument: {
      id: -1,
      name: ""
    }
  };
  const {
    fetchingOrderBooks,
    orderbooks,
    errorOrderPlacement,
    createdOrderId,
    totalCreatedExecutions
  } = useSelector<State, OrderPlacementState>(s => s.orderplacement );

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(orderPlacementActions.requestOrderBooks());
  }, [dispatch]);
  const [myState, setMyState] = React.useState({
    selectedRow: {} as DataModel,
    isButtonDisabled: true
  })

  if (fetchingOrderBooks) return <p>Loading...</p>;

  /**
   * Selected row callback: if same row is selected twice then button is disabled again.
   * @param selectedRow selected orderbook
   */
  const setSelectedRow = (selectedRow: DataModel) => {
    if (selectedRow.id === myState.selectedRow.id) {
      setMyState({
        ...myState,
        selectedRow: emptyDataModel,
        isButtonDisabled: true
      });
    }
    else {
      setMyState({
        ...myState,
        selectedRow,
        isButtonDisabled: false
      });
    }
  }

  /**
   * Submit new order callback: remove 'instrumentName' property before submission
   * @param values new order
   */
  const onSubmitNewOrder = (values: any) => {
    const { instrumentName, ...newData } = values;

    dispatch(orderPlacementActions.requestCreateOrder(myState.selectedRow.id, newData));

    setMyState({
      ...myState,
      selectedRow: emptyDataModel,
      isButtonDisabled: true
    })
  }

  /**
   * Submit new execution callback: remove 'instrumentId' and 'instrumentName'
   * properties before submission
   * @param values new execution
   */
  const onSubmitNewExecution = (values: any) => {
    const { instrumentId, instrumentName, ...newData } = values;

    dispatch(orderPlacementActions.requestCreateExecution(myState.selectedRow.id, newData));

    setMyState({
      ...myState,
      selectedRow: emptyDataModel,
      isButtonDisabled: true
    })
  }

  return (
    <Row>
      <Col xs={12} md={8}>
        <h2>Order Placement</h2>
        <p><small>Click on a row below to select and apply further operations: add order, add execution, etc.</small></p>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 20 }}>
            <AddOrderButton
              isButtonDisabled={myState.isButtonDisabled}
              onSubmit={onSubmitNewOrder}
              instrument={myState.selectedRow.instrument}
            />
          </div>

          <AddExecutionButton
            isButtonDisabled={myState.isButtonDisabled}
            onSubmit={onSubmitNewExecution}
            instrument={myState.selectedRow.instrument}
          />

        </div>
        <div style={{ marginTop: 20 }}>
          <OrderBookTable data={orderbooks} setSelectedRow={setSelectedRow} />
        </div>
      </Col>
      <Col xs={6} md={4}>
        <Card>
          <Card.Header>Execution Result</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>Last created order id: <strong>{<span style={{ color: "green" }}>{ createdOrderId === -1 ? "" : createdOrderId }</span>}</strong></ListGroup.Item>
            <ListGroup.Item>Last created executions: <strong>{<span style={{ color: "green" }}>{ totalCreatedExecutions === -1 ? "" : totalCreatedExecutions }</span>}</strong></ListGroup.Item>
            <ListGroup.Item>Last error: <strong><span style={{ color: "red" }}>{ errorOrderPlacement }</span></strong></ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}