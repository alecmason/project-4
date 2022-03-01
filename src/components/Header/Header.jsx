import React from "react";
import { Link } from "react-router-dom";
import { Header, Segment, Icon, Image } from "semantic-ui-react";

export default function PageHeader({ user, handleLogout }) {
  console.log(user, "user in header");
  return (
    <Segment clearing>
      <Header as="h2" floated="left">
        <Link to="/">&#60;ProjectDeveloper &#47;&#62;</Link>
      </Header>

      <Header as="h2" floated="right">
        {user.username}
        <Image
          src={
            user?.photoUrl
              ? user?.photoUrl
              : "https://react.semantic-ui.com/images/wireframe/square-image.png"
          }
          avatar
        ></Image>

        <Link to="" onClick={handleLogout}>
          Logout
        </Link>
      </Header>
    </Segment>
  );
}
