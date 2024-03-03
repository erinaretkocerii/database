import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import AudioBookList from "./AudioBookList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import DashboardSideBar from "../DashboardSideBar";


export default observer( function AudioBookDashboard() {
  const {audioBookStore} = useStore();
  const {loadAudioBooks, audioBookRegistry} = audioBookStore;


  useEffect(() => {
    if (audioBookRegistry.size <= 1) loadAudioBooks();
  }, [audioBookRegistry.size, loadAudioBooks]);

  if (audioBookStore.loadingInitial) return <LoadingComponent content="Loading app" />;

  return (
    <>
    <DashboardSideBar />
    <Grid>
      
      <Grid.Column width="15">
        <AudioBookList />
      </Grid.Column>
      
    </Grid>
    </>
  );
})
