import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import DashboardNav from "../DashboardNav";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import DashboardSideBar from "../DashboardSideBar";

export default observer(function ReviewDetails() {
  const { reviewStore } = useStore();
  const {
    selectedReview: review,
    loadReview,
    loadingInitial,
  } = reviewStore;
  const { reviewId } = useParams<{ reviewId: string }>();

  useEffect(() => {
    if (reviewId) loadReview(reviewId);
  }, [reviewId, loadReview]);

  if (loadingInitial || !review) return <LoadingComponent />;

  return (
    <><DashboardSideBar />
    <Card.Group style={{ marginTop: "2.8em" }}>
      <Card fluid>
        <Card.Content>
          <Card.Header>{review.email}</Card.Header>
          <Card.Description>Description: {review.reviewText}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group fluid>
            <Button
              as={Link}
              to={`/dashboard/manage/review/${review.reviewId}`}
              basic
              color="blue"
            >
              Update
            </Button>
            <Button
              as={Link}
              to='/dashboard/reviews'
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
