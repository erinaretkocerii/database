import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import DashboardNav from "../DashboardNav";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import DashboardSideBar from "../DashboardSideBar";

export default observer(function BookDetails() {
  const { bookStore } = useStore();
  const {
    selectedBook: book,
    loadBook,
    loadingInitial,
  } = bookStore;
  const { bookId } = useParams<{ bookId: string }>();

  useEffect(() => {
    if (bookId) loadBook(bookId);
  }, [bookId, loadBook]);

  if (loadingInitial || !book) return <LoadingComponent />;

  return (
    <><DashboardSideBar />
    <Card.Group style={{ marginTop: "2.8em" }}>
      <Card fluid>
        <Card.Content>
          <Card.Header>{book.isbn }     {book.bookName}</Card.Header>
          <Card.Description>Author: {book.author}</Card.Description>
          <Card.Description>Description: {book.bookDescription}</Card.Description>
          <Card.Description>Price: {book.price}</Card.Description>
          <Card.Description>Image: {book.bookName}</Card.Description>
          <Card.Description>Category: {book.categoryName}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group fluid>
            <Button
              as={Link}
              to={`/dashboard/manage/book/${book.bookId}`}
              basic
              color="blue"
            >
              Update
            </Button>
            <Button
              as={Link}
              to='/dashboard/books'
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
