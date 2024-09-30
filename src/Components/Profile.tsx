import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  GridItem,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { IoArrowBackOutline } from "react-icons/io5";
import useLocalStorage from "../hooks/useLocalStorage";
import { CONSTANTS } from "../Constants/appConstants";
import { CiEdit, CiLogout, CiText } from "react-icons/ci";
import { user } from "../Services/http-service_user";
import userService from "../Services/userService";

const Profile = () => {
  //const { user, status, setUser } = useContext(LoginContext);
  const { getItem: getStatus, setItem: setStatus } = useLocalStorage(
    CONSTANTS.USER_STATUS_KEY
  );
  const { getItem: getUser, setItem: setUser } = useLocalStorage(
    CONSTANTS.USER_STORAGE_KEY
  );
  const status = getStatus() || "false";
  const user = JSON.parse(getUser() || "");
  const navigate = useNavigate();

  const handleLogout = () => {
    userService.logout();
    navigate("/login", { replace: true });
  };

  if (status == "false") {
    return <Navigate to={"/loign"} replace={true}></Navigate>;
  }
  return (
    <Grid
      templateAreas={`"aside header" "aside main""aside footer"`}
      templateColumns={"150px 1fr"}
    >
      <GridItem area={"aside"}>
        <Button
          onClick={() => {
            navigate("/userpage");
          }}
        >
          <IoArrowBackOutline size={40} />
        </Button>
      </GridItem>

      <GridItem area={"header"}>
        <Text fontSize={30} fontWeight={"bold"}>
          {"Hello, " + user.firstname.toUpperCase()}
        </Text>
      </GridItem>

      <GridItem area={"main"} p={10} justifySelf={"start"}>
        <List spacing={3} textAlign={"start"} fontSize={19}>
          <ListItem
            _hover={{
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/userpage/passwordChange");
            }}
          >
            <ListIcon as={CiEdit} color={"black"}></ListIcon>
            Password Change
          </ListItem>
          <ListItem
            _hover={{
              cursor: "pointer",
            }}
            onClick={() => {
              setStatus(false);
              setUser({} as user);
              handleLogout();
            }}
          >
            <ListIcon as={CiLogout} color={"red"}></ListIcon>
            Logout
          </ListItem>
        </List>
      </GridItem>
    </Grid>
  );
};

export default Profile;
