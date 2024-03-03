import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export default function DashboardNav() {
  return (
    <Menu secondary fixed="top" inverted>
      <Menu.Item header>
        <img
          className="logo"
          src="/images/logo.png"
          alt="logo"
          style={{ marginLeft: "25px" }}
        />
      </Menu.Item>
      <Menu.Item
        as={NavLink}
        to="/"
        name="Home"
        style={{ marginRight: "20px", marginLeft: "20px" }}
      />
       <Menu.Item
        as={NavLink}
        to="/dashboard/books"
        name="Books"
        style={{ marginRight: "20px", marginLeft: "20px" }}
      />
      <Menu.Item
        as={NavLink}
        to="/dashboard/stores"
        name="Stores"
        style={{ marginRight: "20px", marginLeft: "20px" }}
      />
      <Menu.Item
        as={NavLink}
        to="/dashboard/categories"
        name="Categories"
        style={{ marginRight: "20px", marginLeft: "20px" }}
      />
      <Menu.Item
        as={NavLink}
        to="/dashboard/suppliers"
        name="Suppliers"
        style={{ marginRight: "20px", marginLeft: "20px" }}
      />
      <Menu.Item
        as={NavLink}
        to="/dashboard/orders"
        name="Orders"
        style={{ marginRight: "20px", marginLeft: "20px" }}
      />
      <Menu.Item
        as={NavLink}
        to="/dashboard/stocks"
        name="Stocks"
        style={{ marginRight: "20px", marginLeft: "20px" }}
      />
      <Menu.Item
        as={NavLink}
        to="/dashboard/users"
        name="Users"
        style={{ marginRight: "20px", marginLeft: "20px" }}
      />
      <Menu.Item
        as={NavLink}
        to="/dashboard/roles"
        name="Roles"
        style={{ marginRight: "20px", marginLeft: "20px" }}
      />
      
    </Menu>
  );
}
