import React from "react";
import { Card, Container, Image, Segment } from "semantic-ui-react";
import DashboardNav from "./DashboardNav";
import DashboardSideBar from "./DashboardSideBar";

export default function Dashboard() {
  const current = new Date();
  const time = current.toLocaleTimeString("en-US");
  return (
    <>
      <DashboardSideBar />
      <Segment className="dashboard">
        <h1>Welcome to the dashboard, {localStorage.getItem("username")}</h1>
        <p> Current Time is {time}</p>

        <Card.Header>User ID: {localStorage.getItem("userId")}</Card.Header>
        <Card.Description>
          Userame: {localStorage.getItem("username")}
        </Card.Description>
        <Card.Description>
          Name: {localStorage.getItem("name")}
        </Card.Description>
        <Card.Description>
          Surname: {localStorage.getItem("surname")}
        </Card.Description>
        <Card.Description>
          Email: {localStorage.getItem("email")}
        </Card.Description>
      </Segment>
    </>
  );
}
