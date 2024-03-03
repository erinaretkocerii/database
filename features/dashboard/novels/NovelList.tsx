import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Grid, Item, Menu, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function NovelList() {
  const { novelStore } = useStore();
  const { deleteNovel, novelsById, loading } = novelStore;
  const [target, setTarget] = useState("");

  function handleNovelDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    novelId: string
  ) {
    setTarget(e.currentTarget.name);
    deleteNovel(novelId);
  }

  return (
    <>
      <h1>Novel</h1>
      <Grid.Column>
        <Menu.Item>
          <Button
            as={NavLink}
            to="/dashboard/novels/createNovel"
            positive
            content="Create Novel"
          />
        </Menu.Item>
      </Grid.Column>
      <Segment clearing>
        <Item.Group divided>
          {novelsById.map((novel) => (
            <Item key={novel.novelId}>
              <Item.Content>
                <Item.Header as="a" style={{ marginRight: "10px" }}>
                  {novel.novelId}
                </Item.Header>
                <Item.Header as="a">{novel.novelName}</Item.Header>
                <Item.Description>
                  <div>Description: {novel.novelist}</div>
                </Item.Description>
                <Item.Description>
                  <div>Description: {novel.price}</div>
                </Item.Description>
                <Item.Description className="image"floated="right">
                  <div>
                    <img src={`/images/books/${novel.novelName}.jpg`||`/images/books/${novel.novelName}.png`} alt="book cover"/>
                  </div>
                  
                </Item.Description>
                <Item.Extra>
                  <Button
                    as={Link}
                    to={`/dashboard/novels/${novel.novelId}`}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Button
                    name={novel.novelId}
                    loading={loading && target === novel.novelName}
                    onClick={(e) => handleNovelDelete(e, novel.novelId)}
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
