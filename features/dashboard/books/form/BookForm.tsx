import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../../app/layout/LoadingComponents";
import { useStore } from "../../../../app/stores/store";
import "../../../../app/layout/styles.css";
import { Formik, Form} from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../../app/common/form/MyTextInput";
import MyTextArea from "../../../../app/common/form/MyTextArea";
import MySelectInput from "../../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../../app/common/options/CategoryOptions";
import { Book } from "../../../../app/models/book";
import DashboardSideBar from "../../DashboardSideBar";

export default observer(function BookForm() {
  const history = useNavigate();
  const { bookStore } = useStore();
  const { createBook, updateBook, loading, loadBook, loadingInitial } =
    bookStore;
  const { bookId } = useParams<{ bookId: string }>();

  const [book, setBook] = useState({
    bookId: "",
    isbn: "",
    bookName: "",
    author: "",
    bookDescription: "",
    price: "",
    categoryName: "",
  });

  const validationSchema = Yup.object({
    isbn: Yup.string().required("The ISBN is required"),
    bookName: Yup.string().required("The Book Name is required"),
    author: Yup.string().required("The Author is required"),
    bookDescription: Yup.string().required("The Book Description is required"),
    price: Yup.string().required("The Price is required"),
    categoryName: Yup.string().required("The Category Name is required"),
  });

  useEffect(() => {
    if (bookId) loadBook(bookId).then((book) => setBook(book!));
  }, [bookId, loadBook]);

  function handleFormSubmit(book: Book) {
    if (book.bookId.length === 0) {
      let newBook = {
        ...book,
        bookId: "0",
      };
      createBook(newBook).then(() =>
        history(`/dashboard/books/${newBook.bookId}`)
      );
    } else {
      updateBook(book).then(() => history(`/dashboard/books/${book.bookId}`));
    }

  }


  

  if (loadingInitial) return <LoadingComponent content="Loading book..." />;
  return (
    <>
      <DashboardSideBar />
      <div >
        <Segment clearing className={"form"}>
          <Header content="Book Details" sub color="teal"/>
          <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={book}
            onSubmit={(values) => handleFormSubmit(values)}
          >
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
              <Form
                className="ui form"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <MyTextInput name="isbn" placeholder="ISBN" />

                <MyTextInput name="bookName" placeholder="Book Name" />
                <MyTextInput name="author" placeholder="Author" />
                <MyTextArea
                  rows={2}
                  name="bookDescription"
                  placeholder="Book Description"
                />
                <MyTextInput name="price" placeholder="Price" />
                <MySelectInput
                  options={categoryOptions}
                  name="categoryName"
                  placeholder="Category Name"
                />
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
                  to="/dashboard/books"
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
