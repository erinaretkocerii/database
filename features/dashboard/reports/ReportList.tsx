import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Grid, Item, Menu, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ReportList() {
  const { reportStore } = useStore();
  const { deleteReport, reportsById, loading } = reportStore;
  const [target, setTarget] = useState("");

  function handleReportDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    reportId: string
  ) {
    setTarget(e.currentTarget.name);
    deleteReport(reportId);
  }

  return (
    <>
      <h1>Report</h1>
      <Grid.Column>
        <Menu.Item>
          <Button
            as={NavLink}
            to="/dashboard/reports/createReport"
            positive
            content="Create Report"
          />
        </Menu.Item>
      </Grid.Column>
      <Segment clearing>
        <Item.Group divided>
          {reportsById.map((report) => (
            <Item key={report.reportId}>
              <Item.Content>
                <Item.Header as="a" style={{ marginRight: "10px" }}>
                  {report.reportId}
                </Item.Header>
                <Item.Description as="a">{report.reportText}</Item.Description>
                <Item.Description>
                  <div>Date Reported: {report.dateReported}</div>
                </Item.Description>
                <Item.Description>
                  <div>Staff Id: {report.staffId}</div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    as={Link}
                    to={`/dashboard/reports/${report.reportId}`}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Button
                    name={report.reportId}
                    loading={loading && target === report.reportText}
                    onClick={(e) =>
                      handleReportDelete(e, report.reportId)
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
