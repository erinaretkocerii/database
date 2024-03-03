import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../../app/layout/LoadingComponents";
import { useStore } from "../../../../app/stores/store";
import "../../../../app/layout/styles.css";
import { Formik, Form} from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../../app/common/form/MyTextInput";

import { Order } from "../../../../app/models/order";
import DashboardSideBar from "../../DashboardSideBar";

export default observer(function OrderForm() {
  const history = useNavigate();
  const { orderStore } = useStore();
  const { createOrder, updateOrder, loading, loadOrder, loadingInitial } =
  orderStore;
  const { orderId } = useParams<{ orderId: string }>();

  const [order, setOrder] = useState({
    orderId: "",
    bookId: "",
    userId: "",
   
  });

  const validationSchema = Yup.object({
    bookId: Yup.string().required("The Book Id  is required"),
    userId: Yup.string().required("The User id is required"),

  });

  useEffect(() => {
    if (orderId) loadOrder(orderId).then((order) => setOrder(order!));
  }, [orderId, loadOrder]);

  function handleFormSubmit(order: Order) {
    if (order.orderId.length === 0) {
      let newOrder = {
        ...order,
        orderId: "0",
      };
      createOrder(newOrder).then(() =>
        history(`/dashboard/orders/${newOrder.orderId}`)
      );
    } else {
      updateOrder(order).then(() => history(`/dashboard/orders/${order.orderId}`));
    }
  }

  if (loadingInitial) return <LoadingComponent content="Loading booorderk..." />;
  return (
    <>
      <DashboardSideBar />
      <div>
        <Segment clearing className={"form"}>
          <Header content="Order Details" sub color="teal"/>
          <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={order}
            onSubmit={(values) => handleFormSubmit(values)}
          >
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
              <Form
                className="ui form"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <MyTextInput name="bookId" placeholder="Book Id" />

                <MyTextInput name="userId" placeholder="User Id" />
                <Button
                disabled={isSubmitting || !dirty || !isValid}
                  loading={loading}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                <Button
                  as={Link}
                  to="/dashboard/orders"
                  floated="right"
                  type="submit"
                  content="Cancel"
                />
              </Form>
            )}
          </Formik>
        </Segment>
      </div>
    </>
  );
});
