import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import DashboardNav from "../DashboardNav";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import DashboardSideBar from "../DashboardSideBar";

export default observer(function OrderDetails() {
  const { orderStore } = useStore();
  const {
    selectedOrder: order,
    loadOrder,
    loadingInitial,
  } = orderStore;
  const { orderId } = useParams<{ orderId: string }>();

  useEffect(() => {
    if (orderId) loadOrder(orderId);
  }, [orderId, loadOrder]);

  if (loadingInitial || !order) return <LoadingComponent />;

  return (
    <><DashboardSideBar />
    <Card.Group style={{ marginTop: "2.8em" }}>
      <Card fluid>
        <Card.Content>
          <Card.Header>{order.orderId}</Card.Header>
          <Card.Description>Ordered book: {order.bookId}</Card.Description>
          <Card.Description>User: {order.userId}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group fluid>
            <Button
              as={Link}
              to={`/dashboard/manage/order/${order.orderId}`}
              basic
              color="blue"
            >
              Update
            </Button>
            <Button
              as={Link}
              to='/dashboard/orders'
              basic
              color="red"
            >
              Cancel
            </Button>
          </Button.Group>
        </Card.Content>
      </Card>
    </Card.Group>
    </>
  );
});
