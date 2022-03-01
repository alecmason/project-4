import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import ProjectDetail from "../../pages/ProjectDetail/ProjectDetail";

export default function ProjectCard({ project, user }) {
  console.log(project, "<- project in ProjectCard");

  let navigate = useNavigate();

  return (
    <Card key={project._id} raised>
      <Card.Content textAlign="left">
        <Card.Header>
          <Link to={`/projects/${project._id}`}>{project.projectName}</Link>
        </Card.Header>
      </Card.Content>
      <Card.Content textAlign="right">
        <Image
          size="large"
          avatar
          src={
            project.user.photoUrl
              ? project.user.photoUrl
              : "https://react.semantic-ui.com/images/wireframe/square-image.png"
          }
        />
        {project.user.username}
      </Card.Content>
    </Card>
  );
}
