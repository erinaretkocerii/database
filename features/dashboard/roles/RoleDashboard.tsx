import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import RoleList from "./RoleList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import DashboardNav from "../DashboardNav";
import DashboardSideBar from "../DashboardSideBar";


export default observer( function RoleDashboard() {
  const {roleStore} = useStore();
  const {loadRoles, roleRegistry} = roleStore;


  useEffect(() => {
    if (roleRegistry.size <= 1) loadRoles();
  }, [roleRegistry.size, loadRoles]);

  if (roleStore.loadingInitial) return <LoadingComponent content="Loading app" />;

  return (
    <>
    <DashboardSideBar />
    <Grid>
      
      <Grid.Column width="15">
        <RoleList />
      </Grid.Column>
      
    </Grid>
    </>
  );
})
