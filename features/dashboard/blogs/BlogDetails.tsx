import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import DashboardSideBar from "../DashboardSideBar";

export default observer(function BlogDetails() {
  const { blogStore } = useStore();
  const {
    selectedBlog: blog,
    loadBlog,
    loadingInitial,
  } = blogStore;
  const { blogId } = useParams<{ blogId: string }>();

  useEffect(() => {
    if (blogId) loadBlog(blogId);
  }, [blogId, loadBlog]);

  if (loadingInitial || !blog) return <LoadingComponent />;

  return (
    <><DashboardSideBar />
    <Card.Group style={{ marginTop: "2.8em" }}>
      <Card fluid>
        <Card.Content>
          <Card.Header>{blog.blogTitle}</Card.Header>
          <Card.Description>Content: {blog.blogContent}</Card.Description>
          <Card.Description>Published: {blog.published}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group fluid>
            <Button
              as={Link}
              to={`/dashboard/manage/blogs/${blog.blogId}`}
              basic
              color="blue"
            >
              Update
            </Button>
            <Button
              as={Link}
              to='/dashboard/blogs'
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
