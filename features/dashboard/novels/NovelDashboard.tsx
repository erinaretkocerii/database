import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import NovelList from "./NovelList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import DashboardSideBar from "../DashboardSideBar";


export default observer( function NovelDashboard() {
  const {novelStore} = useStore();
  const {loadNovels, novelRegistry} = novelStore;


  useEffect(() => {
    if (novelRegistry.size <= 1) loadNovels();
  }, [novelRegistry.size, loadNovels]);

  if (novelStore.loadingInitial) return <LoadingComponent content="Loading app" />;

  return (
    <>
    <DashboardSideBar />
    <Grid>
      
      <Grid.Column width="15">
        <NovelList />
      </Grid.Column>
      
    </Grid>
    </>
  );
})
