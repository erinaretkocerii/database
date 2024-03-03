import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import BlogList from "./BlogList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import DashboardSideBar from "../DashboardSideBar";


export default observer( function BlogDashboard() {
  const {blogStore} = useStore();
  const {loadBlogs, blogRegistry} = blogStore;


  useEffect(() => {
    if (blogRegistry.size <= 1) loadBlogs();
  }, [blogRegistry.size, loadBlogs]);

  if (blogStore.loadingInitial) return <LoadingComponent content="Loading app" />;

  return (
    <>
    <DashboardSideBar />
    <Grid>
      
      <Grid.Column width="15">
        <BlogList />
      </Grid.Column>
      
    </Grid>
    </>
  );
})
