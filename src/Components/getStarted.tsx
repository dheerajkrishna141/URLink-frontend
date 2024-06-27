import { Button, Center } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const getStarted = () => {
  return (
    <div>
      <Center>
        <Link to="/home">
          <Button>Get Started</Button>
        </Link>
      </Center>
    </div>
  );
};

export default getStarted;
