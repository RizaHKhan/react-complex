import React from 'react';
import { Link } from 'react-router-dom'

function NotFound(props) {
  return (
    <div className="container text-center">
      <h2>We cannot find that {props.item}</h2>
      <p className="lead text-muted">Please vist the <Link to="/">Homepage</Link> to get a fresh start</p>
    </div>
  );
}

export default NotFound
