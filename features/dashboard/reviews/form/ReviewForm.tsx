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
import { Review } from "../../../../app/models/review";
import DashboardSideBar from "../../DashboardSideBar";
import MyTextArea from "../../../../app/common/form/MyTextArea";


export default observer(function ReviewForm() {
  const history = useNavigate();
  const { reviewStore } = useStore();
  const {
    createReview,
    updateReview,
    loading,
    loadReview,
    loadingInitial
  } = reviewStore;
  const { reviewId } = useParams<{ reviewId: string }>();

  const [review, setReview] = useState({
    reviewId: "",
    email: "",
    reviewText: "",
  });

  const validationSchema = Yup.object({
    email: Yup.string().required("The Email is required"),
    reviewText: Yup.string().required("The Review is required"),
  });

  useEffect(() => {
    if (reviewId)
      loadReview(reviewId).then((review) => setReview(review!));
  }, [reviewId, loadReview]);

  function handleFormSubmit(review : Review) {
    if(review.reviewId.length === 0) {
      let newReview = {
        ...review,
        reviewId: "0"
      }
      createReview(newReview).then(() => history(`/dashboard/reviews/${newReview.reviewId}`))
    } else {
      updateReview(review).then (() => history(`/dashboard/reviews/${review.reviewId}`))
    }
  } 

  if(loadingInitial) return <LoadingComponent content="Loading review..."/>
  return (
    <>
    <DashboardSideBar />
    <div>
    <Segment clearing className={"form"}>
    <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={review}
            onSubmit={(values) => handleFormSubmit(values)}
          >
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
              <Form
                className="ui form"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <MyTextInput name="email" placeholder="Email" />
                <MyTextArea name="reviewText" placeholder="Review Text" rows={5}/>

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
                  to="/dashboard/reviews"
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
