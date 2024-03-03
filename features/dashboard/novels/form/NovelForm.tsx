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
import { Novel } from "../../../../app/models/novel";
import DashboardSideBar from "../../DashboardSideBar";


export default observer(function NovelForm() {
  const history = useNavigate();
  const { novelStore } = useStore();
  const {
    createNovel,
    updateNovel,
    loading,
    loadNovel,
    loadingInitial
  } = novelStore;
  const { novelId } = useParams<{ novelId: string }>();

  const [novel, setNovel] = useState({
    novelId: "",
    novelName: "",
    novelist: "",
    price: "",
  });

  const validationSchema = Yup.object({
    novelName: Yup.string().required("The Novel Name is required"),
    novelist: Yup.string().required("The Novelist is required"),
    price: Yup.string().required("Price is required"),
  });

  useEffect(() => {
    if (novelId)
      loadNovel(novelId).then((novel) => setNovel(novel!));
  }, [novelId, loadNovel]);

  function handleFormSubmit(novel : Novel) {
    if(novel.novelId.length === 0) {
      let newNovel = {
        ...novel,
        novelId: "0"
      }
      createNovel(newNovel).then(() => history(`/dashboard/novels/${newNovel.novelId}`))
    } else {
      updateNovel(novel).then (() => history(`/dashboard/novels/${novel.novelId}`))
    }
  }

  if(loadingInitial) return <LoadingComponent content="Loading novel..."/>
  return (
    <>
    <DashboardSideBar />
    <div>
    <Segment clearing className={"form"}>
    <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={novel}
            onSubmit={(values) => handleFormSubmit(values)}
          >
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
              <Form
                className="ui form"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <MyTextInput name="novelName" placeholder="Novel Name" />
                <MyTextInput name="novelist" placeholder="Novelist" />
                <MyTextInput name="price" placeholder="Price" />

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
                  to="/dashboard/novels"
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
