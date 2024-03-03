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
import { Category } from "../../../../app/models/category";
import DashboardSideBar from "../../DashboardSideBar";


export default observer(function CategoryForm() {
  const history = useNavigate();
  const { categoryStore } = useStore();
  const {
    createCategory,
    updateCategory,
    loading,
    loadCategory,
    loadingInitial
  } = categoryStore;
  const { categoryId } = useParams<{ categoryId: string }>();

  const [category, setCategory] = useState({
    categoryId: "",
    categoryName: "",
    categoryDescription: "",
  });

  const validationSchema = Yup.object({
    categoryName: Yup.string().required("The Category Name is required"),
    categoryDescription: Yup.string().required("The Category Description is required"),
  });

  useEffect(() => {
    if (categoryId)
      loadCategory(categoryId).then((category) => setCategory(category!));
  }, [categoryId, loadCategory]);

  function handleFormSubmit(category : Category) {
    if(category.categoryId.length === 0) {
      let newCategory = {
        ...category,
        categoryId: "0"
      }
      createCategory(newCategory).then(() => history(`/dashboard/cateogries/${newCategory.categoryId}`))
    } else {
      updateCategory(category).then (() => history(`/dashboard/cateogries/${category.categoryId}`))
    }
  }

  if(loadingInitial) return <LoadingComponent content="Loading category..."/>
  return (
    <>
    <DashboardSideBar />
    <div>
    <Segment clearing className={"form"}>
    <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={category}
            onSubmit={(values) => handleFormSubmit(values)}
          >
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
              <Form
                className="ui form"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <MyTextInput name="categoryName" placeholder="Category Name" />
                <MyTextInput name="categoryDescription" placeholder="Category Description" />

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
                  to="/dashboard/categories"
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
