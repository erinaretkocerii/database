import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../../app/layout/LoadingComponents";
import { useStore } from "../../../../app/stores/store";
import '../../../../app/layout/styles.css';
import { Formik, Form} from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../../app/common/form/MyTextInput";
import { Blog } from "../../../../app/models/blog";
import DashboardSideBar from "../../DashboardSideBar";


export default observer(function BlogForm() {
  const history = useNavigate();
  const { blogStore } = useStore();
  const {
    createBlog,
    updateBlog,
    loading,
    loadBlog,
    loadingInitial
  } = blogStore;
  const { blogId } = useParams<{ blogId: string }>();

  const [blog, setBlog] = useState({
    blogId: "",
    blogTitle: "",
    blogContent: "",
    published: "",
  });

  const validationSchema = Yup.object({
    blogTitle: Yup.string().required("The Blog Title is required"),
    blogContent: Yup.string().required("The Blog Content is required"),
    published: Yup.string().required("Published is required"),
  });

  useEffect(() => {
    if (blogId)
      loadBlog(blogId).then((blog) => setBlog(blog!));
  }, [blogId, loadBlog]);

  function handleFormSubmit(blog : Blog) {
    if(blog.blogId.length === 0) {
      let newBlog = {
        ...blog,
        blogId: "0"
      }
      createBlog(newBlog).then(() => history(`/dashboard/blogs/${newBlog.blogId}`))
    } else {
      updateBlog(blog).then (() => history(`/dashboard/blogs/${blog.blogId}`))
    }
  }

  if(loadingInitial) return <LoadingComponent content="Loading blog..."/>
  return (
    <>
    <DashboardSideBar />
    <div>
    <Segment clearing className={"form"}>
    <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={blog}
            onSubmit={(values) => handleFormSubmit(values)}
          >
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
              <Form
                className="ui form"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <MyTextInput name="blogTitle" placeholder="Blog Title" />
                <MyTextInput name="blogContent" placeholder="Blog Content" />
                <MyTextInput name="published" placeholder="Published" type="date"/>

                <Button
                disabled={isSubmitting || !dirty || !isValid}
                  loading={loading}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                <Button
                  as={Link}
                  to="/dashboard/blogs"
                  floated="right"
                  type="submit"
                  content="Cancel"
                />
              </Form>
            )}
          </Formik>
    </Segment>
    </div>
    </>
  );
});
