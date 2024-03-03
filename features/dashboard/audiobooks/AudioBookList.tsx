import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Grid, Item, Menu, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function AudioBookList() {
  const { audioBookStore } = useStore();
  const { deleteAudioBook, audioBooksById, loading } = audioBookStore;
  const [target, setTarget] = useState("");

  function handleAudioBookDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    audioBookId: string
  ) {
    setTarget(e.currentTarget.name);
    deleteAudioBook(audioBookId);
  }

  return (
    <>
      <h1>AudioBook</h1>
      <Grid.Column>
        <Menu.Item>
          <Button
            as={NavLink}
            to="/dashboard/audioBooks/createAudioBook"
            positive
            content="Create AudioBook"
          />
        </Menu.Item>
      </Grid.Column>
      <Segment clearing>
        <Item.Group divided>
          {audioBooksById.map((audioBook) => (
            <Item key={audioBook.audioBookId}>
              <Item.Content>
                <Item.Header as="a" style={{ marginRight: "10px" }}>
                  {audioBook.audioBookId}
                </Item.Header>
                <Item.Header as="a">{audioBook.audioBookName}</Item.Header>
                <Item.Description>
                  <div>Length: {audioBook.length}</div>
                </Item.Description>
                <Item.Description>
                  <div>Price: {audioBook.price}</div>
                </Item.Description>
                <Item.Description className="image"floated="right">
                  <div>
                    <img src={`/images/books/${audioBook.audioBookName}.jpg`||`/images/books/${audioBook.audioBookName}.png`} alt="book cover"/>
                  </div>
                  
                </Item.Description>
                <Item.Extra>
                  <Button
                    as={Link}
                    to={`/dashboard/audioBooks/${audioBook.audioBookId}`}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Button
                    name={audioBook.audioBookId}
                    loading={loading && target === audioBook.audioBookName}
                    onClick={(e) =>
                      handleAudioBookDelete(e, audioBook.audioBookId)
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
