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
import { AudioBook } from "../../../../app/models/audioBook";
import DashboardSideBar from "../../DashboardSideBar";


export default observer(function AudioBookForm() {
  const history = useNavigate();
  const { audioBookStore } = useStore();
  const {
    createAudioBook,
    updateAudioBook,
    loading,
    loadAudioBook,
    loadingInitial
  } = audioBookStore;
  const { audioBookId } = useParams<{ audioBookId: string }>();

  const [audioBook, setAudioBook] = useState({
    audioBookId: "",
    audioBookName: "",
    length: "",
    price: ""
  });

  const validationSchema = Yup.object({
    audioBookName: Yup.string().required("The AudioBook Name is required"),
    length: Yup.string().required("The Lenght is required"),
    price: Yup.string().required("The Price is required"),
  });

  useEffect(() => {
    if (audioBookId)
      loadAudioBook(audioBookId).then((audioBook) => setAudioBook(audioBook!));
  }, [audioBookId, loadAudioBook]);

  function handleFormSubmit(audioBook : AudioBook) {
    if(audioBook.audioBookId.length === 0) {
      let newAudioBook = {
        ...audioBook,
        audioBookId: "0"
      }
      createAudioBook(newAudioBook).then(() => history(`/dashboard/audioBooks/${newAudioBook.audioBookId}`))
    } else {
      updateAudioBook(audioBook).then (() => history(`/dashboard/audioBooks/${audioBook.audioBookId}`))
    }
  }

  if(loadingInitial) return <LoadingComponent content="Loading audioBook..."/>
  return (
    <>
    <DashboardSideBar />
    <div>
    <Segment clearing className={"form"}>
    <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={audioBook}
            onSubmit={(values) => handleFormSubmit(values)}
          >
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
              <Form
                className="ui form"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <MyTextInput name="audioBookName" placeholder="AudioBook Name" />
                <MyTextInput name="length" placeholder="Length" />
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
                  to="/dashboard/audioBooks"
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
