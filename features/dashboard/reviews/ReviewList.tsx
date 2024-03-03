import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Grid, Item, Menu, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ReviewList() {
  const { reviewStore } = useStore();
  const { deleteReview, reviewsById, loading } = reviewStore;
  const [target, setTarget] = useState("");

  function handleReviewDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    reviewId: string
  ) {
    setTarget(e.currentTarget.name);
    deleteReview(reviewId);
  }

  return (
    <>
      <h1>Review</h1>
      <Grid.Column>
        <Menu.Item>
          <Button
            as={NavLink}
            to="/dashboard/reviews/createReview"
            positive
            content="Create Review"
          />
        </Menu.Item>
      </Grid.Column>
      <Segment clearing>
        <Item.Group divided>
          {reviewsById.map((review) => (
            <Item key={review.reviewId}>
              <Item.Content>
                <Item.Header as="a" style={{ marginRight: "10px" }}>
                  {review.reviewId}
                </Item.Header>
                <Item.Header as="a">{review.email}</Item.Header>
                <Item.Description>
                  <div>Description: {review.reviewText}</div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    as={Link}
                    to={`/dashboard/reviews/${review.reviewId}`}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Button
                    name={review.reviewId}
                    loading={loading && target === review.email}
                    onClick={(e) =>
                      handleReviewDelete(e, review.reviewId)
                    }
                    floated="right"
                    content="Delete"
                    color="red"
                  />
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    </>
  );
});
