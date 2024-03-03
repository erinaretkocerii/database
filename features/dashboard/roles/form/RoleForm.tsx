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
import { Role } from "../../../../app/models/role";
import DashboardSideBar from "../../DashboardSideBar";


export default observer(function RoleForm() {
  const history = useNavigate();
  const { roleStore } = useStore();
  const {
    createRole,
    updateRole,
    loading,
    loadRole,
    loadingInitial
  } = roleStore;
  const { roleId} = useParams<{ roleId: string }>();

  const [role, setRole] = useState({
    roleId: "",
    roleName: ""
  });

  const validationSchema = Yup.object({
    roleName: Yup.string().required("The Role Name is required"),
  });

  useEffect(() => {
    if (roleId)
      loadRole(roleId).then((role) => setRole(role!));
  }, [roleId, loadRole]);

  function handleFormSubmit(role : Role) {
    if(role.roleId.length === 0) {
      let newRole = {
        ...role,
        roleId: "0"
      }
      createRole(newRole).then(() => history(`/dashboard/cateogries/${newRole.roleId}`))
    } else {
      updateRole(role).then (() => history(`/dashboard/cateogries/${role.roleId}`))
    }
  }

  if(loadingInitial) return <LoadingComponent content="Loading role..."/>
  return (
    <>
    <DashboardSideBar />
    <div>
    <Segment clearing className={"form"}>
    <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={role}
            onSubmit={(values) => handleFormSubmit(values)}
          >
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
              <Form
                className="ui form"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <MyTextInput name="roleName" placeholder="Role Name" />

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
                  to="/dashboard/roles"
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
