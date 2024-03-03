import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import DashboardSideBar from "../DashboardSideBar";

export default observer(function ReportDetails() {
  const { reportStore } = useStore();
  const {
    selectedReport: report,
    loadReport,
    loadingInitial,
  } = reportStore;
  const { reportId } = useParams<{ reportId: string }>();

  useEffect(() => {
    if (reportId) loadReport(reportId);
  }, [reportId, loadReport]);

  if (loadingInitial || !report) return <LoadingComponent />;

  return (
    <><DashboardSideBar />
    <Card.Group style={{ marginTop: "2.8em" }}>
      <Card fluid>
        <Card.Content>
          <Card.Header>{report.reportId}</Card.Header>
          <Card.Description>Report Text: {report.reportText}</Card.Description>
          <Card.Description>Date Reported: {report.dateReported}</Card.Description>
          <Card.Description>Staff Id: {report.staffId}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group fluid>
            <Button
              as={Link}
              to={`/dashboard/manage/reports/${report.reportId}`}
              basic
              color="blue"
            >
              Update
            </Button>
            <Button
              as={Link}
              to='/dashboard/reports'
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
