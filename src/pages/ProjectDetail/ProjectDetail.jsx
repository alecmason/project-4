import { useEffect, useState } from "react";
import { Card, Button, Grid } from "semantic-ui-react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import * as projectsAPI from "../../utils/projectApi";

export default function ProjectDetail({ user }) {
  const [project, setProject] = useState("");

  let navigate = useNavigate();
  let params = useParams();

  console.log(params, "<- params in ProjectDetail");

  async function deleteProject() {
    try {
      const projectId = params.id;

      const project = await projectsAPI.deleteProject(projectId);

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    console.log("useEffect projectdetail");

    const makeApiCall = async () => {
      const projectId = params.id;
      const res = await projectsAPI.getOne(projectId);
      setProject(res);
      console.log(res, "<- res project detail");
    };
    makeApiCall();
  }, []);

  console.log(project, "<- project in project detail");

  if (project.project?.user._id === user._id) {
    return (
      <>
        <Header user={user} />
        <Grid centered>
          <Card>
            <Card.Content>
              <Card.Header>
                <h1>
                  {project.project?.projectName
                    ? project.project.projectName
                    : null}
                </h1>
              </Card.Header>
              <Card.Content textAlign="left">
                <p>
                  {project.project?.description
                    ? project.project.description
                    : null}
                </p>
              </Card.Content>
              <Card.Content extra>
                <Card.Meta textAlign="right">
                  {project.project?.user.username
                    ? project.project.user.username
                    : null}
                </Card.Meta>
                <Card.Meta textAlign="right">
                  {project.project?.user.email
                    ? project.project.user.email
                    : null}
                </Card.Meta>
              </Card.Content>

              <Button color="red" type="submit" onClick={deleteProject}>
                Delete
              </Button>
            </Card.Content>
          </Card>
        </Grid>
      </>
    );
  } else {
    return (
      <>
        <Header user={user} />
        <Grid centered>
          <Card>
            <Card.Content>
              <Card.Header>
                <h1>
                  {project.project?.projectName
                    ? project.project.projectName
                    : null}
                </h1>
              </Card.Header>
              <Card.Content textAlign="left">
                <p>
                  {project.project?.description
                    ? project.project.description
                    : null}
                </p>
              </Card.Content>
              <Card.Content extra>
                <Card.Meta textAlign="right">
                  {project.project?.user.username
                    ? project.project.user.username
                    : null}
                </Card.Meta>
                <Card.Meta textAlign="right">
                  {project.project?.user.email
                    ? project.project.user.email
                    : null}
                </Card.Meta>
              </Card.Content>
            </Card.Content>
          </Card>
        </Grid>
      </>
    );
  }
}
