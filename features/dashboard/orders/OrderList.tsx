import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Grid, Item, Menu, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function OrderList() {
  const { orderStore } = useStore();
  const { deleteOrder, ordersById, loading } = orderStore;
  const [target, setTarget] = useState("");

  function handleOrderDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    orderId: string
  ) {
    setTarget(e.currentTarget.name);
    deleteOrder(orderId);
  }

  return (
    <>
      <h1>Order</h1>
      <Grid.Column>
        <Menu.Item>
          <Button
            as={NavLink}
            to="/dashboard/orders/createOrder"
            positive
            content="Create Order"
          />
        </Menu.Item>
      </Grid.Column>
      <Segment clearing>
        <Item.Group divided>
          {ordersById.map((order) => (
            <Item key={order.orderId}>
              <Item.Content>
                <Item.Header as="a" style={{ marginRight: "10px" }}>
                  {order.orderId}
                </Item.Header>
                <Item.Description>
                  <div>Ordered book: {order.bookId}</div>
                </Item.Description>
                <Item.Description>
                  <div>User: {order.userId}</div>
                </Item.Description>

                <Item.Extra>
                  <Button
                    as={Link}
                    to={`/dashboard/orders/${order.orderId}`}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Button
                    name={order.orderId}
                    loading={loading && target === order.orderId}
                    onClick={(e) => handleOrderDelete(e, order.orderId)}
                    floated="right"
                    content="Delete"
                    color="red"
                  />
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    </>
  );
});
