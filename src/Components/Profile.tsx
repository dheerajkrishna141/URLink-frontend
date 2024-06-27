import React, { useContext } from "react";
import LoginContext from "../StateManagement/LoginContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Box, Button, Text } from "@chakra-ui/react";
import useLocalStorage from "../hooks/useLocalStorage";
import { user } from "../Services/http-service_user";

const Profile = () => {
  //const { user, status, setUser } = useContext(LoginContext);
  const { getItem: getUserStatus, setItem: setUserStatus } =
    useLocalStorage("userStatus");
  const { getItem: getUser, clear: clearUser } = useLocalStorage("user");
  const { getItem: getUserId, setItem: setUserId } = useLocalStorage("userId");
  const status = JSON.parse(getUserStatus() || "false");
  const id = getUserId();
  const user = JSON.parse(getUser() || "{}");
  if (!status) return <Navigate to={"/login"} replace={true}></Navigate>;

  return (
    <Box marginTop={5}>
      <Text fontSize={30} fontWeight={"bold"}>
        Hello, {user.firstname.toUpperCase()}
      </Text>

      <Text>Nothing to do right now</Text>
      <Text>Should do something here</Text>
    </Box>
  );
};

export default Profile;
