import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import DashboardSideBar from "../DashboardSideBar";
import ReportList from "./ReportList";


export default observer( function ReportDashboard() {
  const {reportStore} = useStore();
  const {loadReports, reportRegistry} = reportStore;


  useEffect(() => {
    if (reportRegistry.size <= 1) loadReports();
  }, [reportRegistry.size, loadReports]);

  if (reportStore.loadingInitial) return <LoadingComponent content="Loading app" />;

  return (
    <>
    <DashboardSideBar />
    <Grid>
      
      <Grid.Column width="15">
        <ReportList />
      </Grid.Column>
      
    </Grid>
    </>
  );
})
