import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, ListGroup } from "react-bootstrap";
import Card from 'react-bootstrap/Card'

import { actions as orderBookActions } from "../../data/actions/orderbook";
import { OrderBookState } from "../../data/reducers/orderbook";
import { State } from "../../data/reducers";
import { LimitOrder } from "../../types/Order";
import OrderTable from "../OrderTable";
import ExecutionTable from "../ExecutionTable";

/**
 * Order book: window is divide into two parts (width=8:4)
 * 
 * Main part has two tables sitting in parallel. Left table is order list and
 * right table is execution list. Once a row is slected from left table, a
 * request will be sent to back end to and right table will be updated
 * accordingly.
 * 
 * Right part is a card showing execution result, including 'Last error'
 */
export default function OrderBook() {
  const emptyDataModel: LimitOrder = {
    id: -1,
    type: "",
    quantity: -1,
    instrumentId: -1,
    price: -1,
  };
  const { fetchingOrders, orders, errorOrderBook, executions } = useSelector<State, OrderBookState>(s => s.orderbook );
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(orderBookActions.requestOrders());
  }, [dispatch]);
  const [myState, setMyState] = React.useState({
    selectedRow: {} as LimitOrder,
  })

  if (fetchingOrders) return <p>Loading...</p>;

  /**
   * Select row callback
   * @param selectedRow selected order
   */
  const setSelectedRow = (selectedRow: LimitOrder) => {
    if (selectedRow.id === myState.selectedRow.id) {
      setMyState({
        ...myState,
        selectedRow: emptyDataModel,
      });
    }
    else {
      setMyState({
        ...myState,
        selectedRow,
      });
    }

    dispatch(orderBookActions.requestExecutionsByOrderId(selectedRow.id));
  }
  return (
    <Row>
      <Col xs={12} md={8}>
        <h2>Order Book</h2>
        <p><small>Click on a row below to select and apply further operations: view executions, etc.</small></p>
        <div style={{ marginTop: 20 }}>
          <Row>
            <Col><OrderTable data={orders} setSelectedRow={setSelectedRow} /></Col>
            <Col><ExecutionTable data={executions} /></Col>
          </Row>
        </div>
      </Col>
      <Col xs={6} md={4}>
        <Card>
          <Card.Header>Execution Result</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>Last error: <strong><span style={{ color: "red" }}>{errorOrderBook} </span></strong></ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}