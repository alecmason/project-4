import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import AddProject from "../../components/AddProjectForm/AddProjectForm";
import ProjectFeed from "../../components/ProjectFeed/ProjectFeed";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import * as projectsAPI from "../../utils/projectApi";
// import {create, getAll} from '../../utils/ProjectApi'
import { Grid } from "semantic-ui-react";

export default function Feed({ user, handleLogout }) {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  async function handleAddProject(project) {
    try {
      const data = await projectsAPI.create(project); // our server is going to return
      console.log(
        data,
        " this is response from the server, in handleAddProject"
      );
      setProjects([data.project, ...projects]);
    } catch (err) {
      setError(err.message);
      console.log(err);
      setError(err.message);
    }
  }

  // R read in crud
  async function getProjects() {
    try {
      const data = await projectsAPI.getAll();
      console.log(data, " this is data,");
      setProjects([...data.projects]);
    } catch (err) {
      console.log(err.message, " this is the error");
      setError(err.message);
    }
  }

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <Header user={user} handleLogout={handleLogout} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <AddProject handleAddProject={handleAddProject} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <ProjectFeed
            projects={projects}
            numPhotosCol={1}
            // isProfile={false}
            user={user}
            // addLike={addLike}
            // loading={loading}
            // removeLike={removeLike}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
