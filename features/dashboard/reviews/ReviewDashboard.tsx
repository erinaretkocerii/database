import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";

import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import DashboardNav from "../DashboardNav";
import DashboardSideBar from "../DashboardSideBar";
import ReviewList from "./ReviewList";



export default observer( function ReviewDashboard() {
  const {reviewStore} = useStore();
  const {loadReviews, reviewRegistry} = reviewStore;


  useEffect(() => {
    if (reviewRegistry.size <= 1) loadReviews();
  }, [reviewRegistry.size, loadReviews]);

  if (reviewStore.loadingInitial) return <LoadingComponent content="Loading app" />;

  return (
    <>
    <DashboardSideBar />
    <Grid>
      
      <Grid.Column width="15">
        <ReviewList />
      </Grid.Column>
      
    </Grid>
    </>
  );
})
