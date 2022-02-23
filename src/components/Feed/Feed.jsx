import React, { useState } from "react";
import PageHeader from "../Header/Header";
import AddProject from "../../components/AddProjectForm/AddProjectForm";
import ProjectFeed from "../../components/ProjectFeed/ProjectFeed";
import * as projectsAPI from "../../utils/projectApi";

export default function Feed({ user, handleLogout }) {
  const [projects, setProjects] = useState([]);

  async function handleAddProject(project) {
    console.log(project);
    const data = await projectsAPI.create(project);
    console.log(data.project, "<- data.project", data, "<- data variable");
    setProjects((projects) => [data.project, ...projects]);
  }

  console.log(user);
  return (
    <>
      <PageHeader user={user} />
      <AddProject handleAddProject={handleAddProject} />
      <ProjectFeed />
    </>
  );
}
