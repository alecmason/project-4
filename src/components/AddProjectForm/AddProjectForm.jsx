import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Segment,
  TextArea,
} from "semantic-ui-react";

export default function AddProjectForm(props) {
  const [selectedFile, setSelectedFile] = useState("");
  const [state, setState] = useState({
    projectName: "",
    description: "",
    projectUrl: "",
  });

  function handleFileInput(e) {
    setSelectedFile(e.target.files[0]);
  }

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("projectName", state.projectName);
    formData.append("description", state.description);
    formData.append("projectUrl", state.projectUrl);
    props.handleAddProject(formData);
  }

  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment>
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <Form.Input
              className="form-control"
              name="projectName"
              value={state.projectName}
              placeholder="Project Name"
              onChange={handleChange}
              required
            />
            <Form.Field
              control={TextArea}
              className="form-control"
              name="description"
              value={state.description}
              placeholder="Project Description"
              onChange={handleChange}
              required
            />
            <Form.Input
              className="form-control"
              name="projectUrl"
              value={state.projectUrl}
              placeholder="Project URL (If you have one)"
              onChange={handleChange}
            />
            <Form.Input
              className="form-control"
              type="file"
              name="photo"
              placeholder="upload image"
              onChange={handleFileInput}
            />
            <Button type="submit" className="btn">
              Create
            </Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}
