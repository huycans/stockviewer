import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();
  return (
    <div>
      <h1>404 not found </h1>
      <p>
        You want to access{" "}
        <span className="notFoundText">{location.pathname}</span>, which doesn't
        exist.
      </p>
      <p>
        <Link to="/">Click here</Link> to go back to the home page
      </p>
    </div>
  );
}
