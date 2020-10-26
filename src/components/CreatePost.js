import React, { useEffect, useState, useContext } from "react";
import ExampleContext from "../ExampleContext";
import Axios from "axios";
import { withRouter } from "react-router-dom";

function CreatePost(props) {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const { addFlashMessage } = useContext(ExampleContext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await Axios.post("/create-post", {
        title,
        body,
        token: localStorage.getItem("complexappToken"),
      });
      addFlashMessage("Congrats! post successfully created!");
      props.history.push(`/post/${response.data}`);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            id="post-title"
            className="form-control form-control-lg form-control-title"
            type="text"
            placeholder=""
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea
            name="body"
            onChange={(e) => setBody(e.target.value)}
            id="post-body"
            className="body-content tall-textarea form-control"
            type="text"
          ></textarea>
        </div>
        <button className="btn btn-primary">Save New Post</button>
      </form>
    </div>
  );
}

export default withRouter(CreatePost);
