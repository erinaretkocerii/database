import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import DashboardSideBar from "../DashboardSideBar";

export default observer(function NovelDetails() {
  const { novelStore } = useStore();
  const {
    selectedNovel: novel,
    loadNovel,
    loadingInitial,
  } = novelStore;
  const { novelId } = useParams<{ novelId: string }>();

  useEffect(() => {
    if (novelId) loadNovel(novelId);
  }, [novelId, loadNovel]);

  if (loadingInitial || !novel) return <LoadingComponent />;

  return (
    <><DashboardSideBar />
    <Card.Group style={{ marginTop: "2.8em" }}>
      <Card fluid>
        <Card.Content>
          <Card.Header>{novel.novelName}</Card.Header>
          <Card.Description>Description: {novel.novelist}</Card.Description>
          <Card.Description>Description: {novel.price}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group fluid>
            <Button
              as={Link}
              to={`/dashboard/manage/novels/${novel.novelId}`}
              basic
              color="blue"
            >
              Update
            </Button>
            <Button
              as={Link}
              to='/dashboard/novels'
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
