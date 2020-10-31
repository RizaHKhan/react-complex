import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import LoadingDotsIcon from "./LoadingDotsIcon";
import Axios from "axios";
import ReactMarkdown from "react-markdown";
import ReactToolTip from 'react-tooltip'

function ViewSinglePost() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    async function fetchPost() {
      try {
        const response = await Axios.get(`/post/${id}`, {
          cancelToken: ourRequest.token,
        });
        setPost(response.data);
        setIsLoading(false);
      } catch (e) {
        console.log("there was a problem");
      }
    }
    fetchPost();
    return () => {
      // Unmount hook basically
      ourRequest.cancel();
    };
  }, []);

  if (isLoading) return <LoadingDotsIcon />;

  const date = new Date(post.createdDate);
  const dateFormatted = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;

  return (
    <div class="container">
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>
        <span className="pt-2">
          <Link to={`/post/${post._id}/edit`} data-tip="Edit" data-for="edit" className="text-primary mr-2">
            <i class="fas fa-edit"></i>
          </Link>
          <ReactToolTip id="edit" className="custom-tooltip"/>
          {" "}
          <a data-tip="Delete" data-for="delete" className="delete-post-button text-danger">
            <i class="fas fa-trash"></i>
          </a>
          <ReactToolTip id="delete" className="custom-tooltip"/>
        </span>
      </div>

      <p className="text-muted small mb-4">
        <Link to={`/profile/${post.author.username}`}>
          <img className="avatar-tiny" src={post.author.avatar} />
        </Link>
        Posted by{" "}
        <Link to={`/profile/${post.author.username}`}>
          {post.author.usename}
        </Link>{" "}
        on {dateFormatted}
      </p>

      <div className="body-content">
        <ReactMarkdown
          source={post.body}
          allowedTypes={[
            "paragraphs",
            "strong",
            "text",
            "heading",
            "list",
            "listItem",
          ]}
        />
      </div>
    </div>
  );
}

export default ViewSinglePost;
