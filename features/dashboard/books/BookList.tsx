import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Grid, Item, Menu, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function BookList() {
  const { bookStore } = useStore();
  const { deleteBook, booksById, loading } = bookStore;
  const [target, setTarget] = useState("");

  function handleBookDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    bookId: string
  ) {
    setTarget(e.currentTarget.name);
    deleteBook(bookId);
  }

  return (
    <>
      <h1>Book</h1>
      <Grid.Column>
        <Menu.Item>
          <Button
            as={NavLink}
            to="/dashboard/books/createBook"
            positive
            content="Create Book"
          />
        </Menu.Item>
      </Grid.Column>
      <Segment clearing>
        <Item.Group divided>
          {booksById.map((book) => (
            <Item key={book.bookId}>
              <Item.Content>
                <Item.Header as="a" style={{ marginRight: "10px" }}>
                  {book.bookId}
                </Item.Header>
                <Item.Header as="a" style={{ marginRight: "10px" }}>
                  {book.isbn}
                </Item.Header>
                <Item.Header as="a">{book.bookName}</Item.Header>
                <Item.Description>
                  <div>Author: {book.author}</div>
                </Item.Description>
                <Item.Description>
                  <div>Description: {book.bookDescription}</div>
                </Item.Description>
                <Item.Description>
                  <div>Price: {book.price}</div>
                </Item.Description>
                
                <Item.Description>
                  <div>Category: {book.categoryName}</div>
                </Item.Description>
                <Item.Description className="image"floated="right">
                  <div>
                    <img src={`/images/books/${book.bookName}.jpg`||`/images/books/${book.bookName}.png`} alt="book cover"/>
                  </div>
                  
                </Item.Description>

                <Item.Extra>
                  <Button
                    as={Link}
                    to={`/dashboard/books/${book.bookId}`}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Button
                    name={book.bookId}
                    loading={loading && target === book.author}
                    onClick={(e) => handleBookDelete(e, book.bookId)}
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
