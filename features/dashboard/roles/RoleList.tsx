import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Grid, Item, Menu, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function RoleList() {
  const { roleStore } = useStore();
  const { deleteRole, rolesById, loading } = roleStore;
  const [target, setTarget] = useState("");

  function handleRoleDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    roleId: string
  ) {
    setTarget(e.currentTarget.name);
    deleteRole(roleId);
  }

  return (
    <>
      <h1>Role</h1>
      <Grid.Column>
        <Menu.Item>
          <Button
            as={NavLink}
            to="/dashboard/roles/createRole"
            positive
            content="Create Role"
          />
        </Menu.Item>
      </Grid.Column>
      <Segment clearing>
        <Item.Group divided>
          {rolesById.map((role) => (
            <Item key={role.roleId}>
              <Item.Content>
                <Item.Header as="a" style={{ marginRight: "10px" }}>
                  {role.roleId}
                </Item.Header>
                <Item.Description>
                  <div>Role Name: {role.roleName}</div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    as={Link}
                    to={`/dashboard/roles/${role.roleId}`}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Button
                    name={role.roleId}
                    loading={loading && target === role.roleId}
                    onClick={(e) =>
                      handleRoleDelete(e, role.roleId)
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
