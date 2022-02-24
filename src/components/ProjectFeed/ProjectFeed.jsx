import React from "react";
import { Card, Icon, Image, Segment, Dimmer } from "semantic-ui-react";

import ProjectCard from "../../components/ProjectCard/ProjectCard";

export default function ProjectFeed({ projects, user }) {
  console.log(projects, "<-project", user, "<- user");
  return (
    <Card.Group itemsPerRow={1} stackable>
      {projects.reverse().map((project) => {
        return <ProjectCard project={project} key={project._id} user={user} />;
      })}
    </Card.Group>
  );
}
