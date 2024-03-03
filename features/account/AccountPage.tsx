import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { Button, Card, Image } from "semantic-ui-react";
import { userInfo } from "os";
import { useStore } from "../../app/stores/store";
import LoadingComponent from "../../app/layout/LoadingComponents";

export default function AccountPage() {

  const { usersStore } = useStore();
  const {
    selectedUser: user,
    loadUser,
    loadingInitial,
  } = usersStore;
  const  userId  = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) loadUser(userId);
  }, [userId, loadUser]);

  if (loadingInitial || !user) return <LoadingComponent />;
  return (
    <>
      <Navbar />
      <Card.Group>
        <Card className="accountDetails">
          <Card.Content>
            <Image src="/images/user.jpg" />
            
            <Card.Header>User ID: {user.userId}</Card.Header>
            <Card.Description>Userame: {user.username}</Card.Description>
            <Card.Description>Name: {user.name}</Card.Description>
            <Card.Description>Surname: {user.surname}</Card.Description>
            <Card.Description>Email: {user.email}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div>
              <Button
                as={Link}
                to={`/update-account/${localStorage.getItem("userId")}`}
                floated="right"
                type="submit"
                content="Update Information"
                className="updateAccount"
              />
            </div>
          </Card.Content>
        </Card>
      </Card.Group>
      
    </>
  );
}
