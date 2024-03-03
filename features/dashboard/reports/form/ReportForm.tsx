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
import { Report } from "../../../../app/models/report";
import DashboardSideBar from "../../DashboardSideBar";


export default observer(function ReportForm() {
  const history = useNavigate();
  const { reportStore } = useStore();
  const {
    createReport,
    updateReport,
    loading,
    loadReport,
    loadingInitial
  } = reportStore;
  const { reportId } = useParams<{ reportId: string }>();

  const [report, setReport] = useState({
    reportId: "",
    reportText: "",
    dateReported: "",
    staffId: "",
  });

  const validationSchema = Yup.object({
    reportText: Yup.string().required("The Report Text is required"),
    staffId: Yup.string().required("Staff ID is required"),
  });

  useEffect(() => {
    if (reportId)
      loadReport(reportId).then((report) => setReport(report!));
  }, [reportId, loadReport]);

  function handleFormSubmit(report : Report) {
    if(report.reportId.length === 0) {
      let newReport = {
        ...report,
        reportId: "0"
      }
      createReport(newReport).then(() => history(`/dashboard/reports/${newReport.reportId}`))
    } else {
      updateReport(report).then (() => history(`/dashboard/reports/${report.reportId}`))
    }
  }

  if(loadingInitial) return <LoadingComponent content="Loading report..."/>
  return (
    <>
    <DashboardSideBar />
    <div>
    <Segment clearing className={"form"}>
    <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={report}
            onSubmit={(values) => handleFormSubmit(values)}
          >
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
              <Form
                className="ui form"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <MyTextInput name="reportText" placeholder="Report Text" />

                <MyTextInput name="dateReported" placeholder="Date Reported" type="date" />
                
                <MyTextInput name="staffId" placeholder="Staff Id" />

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
                  to="/dashboard/reports"
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
