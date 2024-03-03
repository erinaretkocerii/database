import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Grid, Item, Menu, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function BlogList() {
  const { blogStore } = useStore();
  const { deleteBlog, blogsById, loading } = blogStore;
  const [target, setTarget] = useState("");

  function handleBlogDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    blogId: string
  ) {
    setTarget(e.currentTarget.name);
    deleteBlog(blogId);
  }

  return (
    <>
      <h1>Blog</h1>
      <Grid.Column>
        <Menu.Item>
          <Button
            as={NavLink}
            to="/dashboard/blogs/createBlog"
            positive
            content="Create Blog"
          />
        </Menu.Item>
      </Grid.Column>
      <Segment clearing>
        <Item.Group divided>
          {blogsById.map((blog) => (
            <Item key={blog.blogId}>
              <Item.Content>
                <Item.Header as="a" style={{ marginRight: "10px" }}>
                  {blog.blogId}
                </Item.Header>
                <Item.Header as="a">{blog.blogTitle}</Item.Header>
                <Item.Description>
                  <div>Content: {blog.blogContent}</div>
                </Item.Description>
                <Item.Description>
                  <div>Published: {blog.published}</div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    as={Link}
                    to={`/dashboard/blogs/${blog.blogId}`}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Button
                    name={blog.blogId}
                    loading={loading && target === blog.blogTitle}
                    onClick={(e) =>
                      handleBlogDelete(e, blog.blogId)
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
