import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import DashboardNav from "../DashboardNav";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import DashboardSideBar from "../DashboardSideBar";

export default observer(function CategoryDetails() {
  const { categoryStore } = useStore();
  const {
    selectedCategory: category,
    loadCategory,
    loadingInitial,
  } = categoryStore;
  const { categoryId } = useParams<{ categoryId: string }>();

  useEffect(() => {
    if (categoryId) loadCategory(categoryId);
  }, [categoryId, loadCategory]);

  if (loadingInitial || !category) return <LoadingComponent />;

  return (
    <><DashboardSideBar />
    <Card.Group style={{ marginTop: "2.8em" }}>
      <Card fluid>
        <Card.Content>
          <Card.Header>{category.categoryName}</Card.Header>
          <Card.Description>Description: {category.categoryDescription}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group fluid>
            <Button
              as={Link}
              to={`/dashboard/manage/category/${category.categoryId}`}
              basic
              color="blue"
            >
              Update
            </Button>
            <Button
              as={Link}
              to='/dashboard/categories'
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
