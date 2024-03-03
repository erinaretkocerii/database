import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

interface Props {
  openForm: () => void;
}

const DashboardNav: React.FC<Props> = ({ openForm }: Props) => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img
            className="logo"
            src="/images/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
        </Menu.Item>
          <Menu.Item name="home" />
          <Menu.Item name="messages" />
          <Menu.Item name="friends" />
        <Menu.Item>
          <Button onClick={openForm} positive content="Create Category" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default DashboardNav;
