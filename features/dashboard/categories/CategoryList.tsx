import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Grid, Item, Menu, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function CategoryList() {
  const { categoryStore } = useStore();
  const { deleteCategory, categoriesById, loading } = categoryStore;
  const [target, setTarget] = useState("");

  function handleCategoryDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    categoryId: string
  ) {
    setTarget(e.currentTarget.name);
    deleteCategory(categoryId);
  }

  return (
    <>
      <h1>Category</h1>
      <Grid.Column>
        <Menu.Item>
          <Button
            as={NavLink}
            to="/dashboard/categories/createCategory"
            positive
            content="Create Category"
          />
        </Menu.Item>
      </Grid.Column>
      <Segment clearing>
        <Item.Group divided>
          {categoriesById.map((category) => (
            <Item key={category.categoryId}>
              <Item.Content>
                <Item.Header as="a" style={{ marginRight: "10px" }}>
                  {category.categoryId}
                </Item.Header>
                <Item.Header as="a">{category.categoryName}</Item.Header>
                <Item.Description>
                  <div>Description: {category.categoryDescription}</div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    as={Link}
                    to={`/dashboard/categories/${category.categoryId}`}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Button
                    name={category.categoryId}
                    loading={loading && target === category.categoryDescription}
                    onClick={(e) =>
                      handleCategoryDelete(e, category.categoryId)
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
