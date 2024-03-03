import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import DashboardNav from "../DashboardNav";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import DashboardSideBar from "../DashboardSideBar";

export default observer(function RoleDetails() {
  const { roleStore } = useStore();
  const {
    selectedRole: role,
    loadRole,
    loadingInitial,
  } = roleStore;
  const { roleId } = useParams<{ roleId: string }>();

  useEffect(() => {
    if (roleId) loadRole(roleId);
  }, [roleId, loadRole]);

  if (loadingInitial || !role) return <LoadingComponent />;

  return (
    <><DashboardSideBar />
    <Card.Group style={{ marginTop: "2.8em" }}>
      <Card fluid>
        <Card.Content>
          <Card.Header>{role.roleId}</Card.Header>
          <Card.Description>Role Name: {role.roleName}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group fluid>
            <Button
              as={Link}
              to={`/dashboard/manage/roles/${role.roleId}`}
              basic
              color="blue"
            >
              Update
            </Button>
            <Button
              as={Link}
              to='/dashboard/roles'
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
