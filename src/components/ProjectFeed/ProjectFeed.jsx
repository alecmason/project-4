import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function ProjectFeed({ project, user }) {
  return (
    <div>
      <Card key={project._id} raised></Card>
    </div>
  );
}
