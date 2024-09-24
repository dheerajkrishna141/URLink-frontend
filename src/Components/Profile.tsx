import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Box, Button, Text } from "@chakra-ui/react";
import { IoArrowBackOutline } from "react-icons/io5";
import useLocalStorage from "../hooks/useLocalStorage";
import { CONSTANTS } from "../Constants/appConstants";

const Profile = () => {
  //const { user, status, setUser } = useContext(LoginContext);
  const { getItem: getStatus } = useLocalStorage(CONSTANTS.USER_STATUS_KEY);
  const { getItem: getUser } = useLocalStorage(CONSTANTS.USER_STORAGE_KEY);
  const status = getStatus() || "false";
  const user = JSON.parse(getUser() || "");
  const navigate = useNavigate();

  if (status == "false") {
    return <Navigate to={"/loign"} replace={true}></Navigate>;
  }
  return (
    <Box marginTop={5}>
      <Box>
        <Button
          position={"absolute"}
          left={10}
          onClick={() => {
            navigate("/userpage");
          }}
        >
          <IoArrowBackOutline size={40} />
        </Button>
      </Box>
      <Text fontSize={30} fontWeight={"bold"}>
        Hello, {user.firstname.toUpperCase()}
      </Text>

      <Text>Nothing to do right now</Text>
      <Text>Should do something here</Text>
    </Box>
  );
};

export default Profile;
