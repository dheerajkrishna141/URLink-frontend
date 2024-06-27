import { Box, Button, ButtonGroup, HStack, Heading } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Heading marginBottom={5}>Home</Heading>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <ButtonGroup gap="4">
          <Link to="/login">
            <Button>Login</Button>
          </Link>
          <Link to="/Register">
            <Button>Register</Button>
          </Link>
        </ButtonGroup>
      </Box>
    </div>
  );
};

export default Home;
