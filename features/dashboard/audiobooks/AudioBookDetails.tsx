import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import DashboardSideBar from "../DashboardSideBar";

export default observer(function AudioBookDetails() {
  const { audioBookStore } = useStore();
  const {
    selectedAudioBook: audioBook,
    loadAudioBook,
    loadingInitial,
  } = audioBookStore;
  const { audioBookId } = useParams<{ audioBookId: string }>();

  useEffect(() => {
    if (audioBookId) loadAudioBook(audioBookId);
  }, [audioBookId, loadAudioBook]);

  if (loadingInitial || !audioBook) return <LoadingComponent />;

  return (
    <><DashboardSideBar />
    <Card.Group style={{ marginTop: "2.8em" }}>
      <Card fluid>
        <Card.Content>
          <Card.Header>{audioBook.audioBookName}</Card.Header>
          <Card.Description>Length: {audioBook.length}</Card.Description>
          <Card.Description>Price: {audioBook.price}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group fluid>
            <Button
              as={Link}
              to={`/dashboard/manage/audioBooks/${audioBook.audioBookId}`}
              basic
              color="blue"
            >
              Update
            </Button>
            <Button
              as={Link}
              to='/dashboard/audioBooks'
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
