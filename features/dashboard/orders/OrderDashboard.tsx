import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import Book from "./OrderList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import DashboardNav from "../DashboardNav";
import DashboardSideBar from "../DashboardSideBar";


export default observer( function OrderDashboard() {
  const {orderStore} = useStore();
  const {loadOrders, orderRegistry} = orderStore;


  useEffect(() => {
    if (orderRegistry.size <= 1) loadOrders();
  }, [orderRegistry.size, loadOrders]);

  if (orderStore.loadingInitial) return <LoadingComponent content="Loading app" />;

  return (
    <>
    <DashboardSideBar />
    <Grid>
      
      <Grid.Column width="15">
        <Book />
      </Grid.Column>
      
    </Grid>
    </>
  );
})
