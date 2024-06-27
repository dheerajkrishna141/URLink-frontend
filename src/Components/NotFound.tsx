import { Heading } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div>
      <Heading>Error 404 NotFound</Heading>

      <Link to="/">Click to Continue</Link>
    </div>
  );
};

export default NotFound;
