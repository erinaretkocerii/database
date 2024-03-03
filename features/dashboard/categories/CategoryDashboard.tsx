import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import CategortyList from "./CategoryList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import DashboardNav from "../DashboardNav";
import DashboardSideBar from "../DashboardSideBar";


export default observer( function CategoryDashboard() {
  const {categoryStore} = useStore();
  const {loadCategories, categoryRegistry} = categoryStore;


  useEffect(() => {
    if (categoryRegistry.size <= 1) loadCategories();
  }, [categoryRegistry.size, loadCategories]);

  if (categoryStore.loadingInitial) return <LoadingComponent content="Loading app" />;

  return (
    <>
    <DashboardSideBar />
    <Grid>
      
      <Grid.Column width="15">
        <CategortyList />
      </Grid.Column>
      
    </Grid>
    </>
  );
})
