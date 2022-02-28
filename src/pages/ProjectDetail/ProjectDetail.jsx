import { Card, Button, Grid } from "semantic-ui-react";
import Header from "../../components/Header/Header";
import * as projectsAPI from "../../utils/projectApi";

export default function ProjectDetail({ project, user }) {
  console.log(project, "<- project in project detail page");

  function handleSubmit() {
    console.log("delete");
  }

  return (
    <>
      <Header user={user} />
      <Grid centered>
        <Card>
          <Card.Content>
            <Card.Header>
              <h1>Project Name</h1>
            </Card.Header>
            <Card.Content textAlign="left">
              <p>Project Description</p>
            </Card.Content>
            <Card.Content extra>
              <Card.Meta textAlign="right">Username</Card.Meta>
              <Card.Meta textAlign="right">Email</Card.Meta>
            </Card.Content>

            {/* if project.User === user =>  show delete button */}
            <Button color="red" type="submit" onClick={handleSubmit}>
              Delete
            </Button>
          </Card.Content>
        </Card>
      </Grid>
    </>
  );
}
