import {
  Button,
  HStack,
  Text,
  useDisclosure,
  Alert,
  AlertIcon,
  CloseButton,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import AddingUrl from "./AddingUrl";
import { useNavigate } from "react-router-dom";
import LoginContext from "../StateManagement/LoginContext";
import { CiLogout } from "react-icons/ci";
import { FaUserLarge } from "react-icons/fa6";
import useUrl from "../hooks/useUrl";
import useAddUrl from "../hooks/useAddUrl";
import useLocalStorage from "../hooks/useLocalStorage";
import useUpdateUrl from "../hooks/useUpdateUrl";
import useDeleteUrl from "../hooks/useDeleteUrl";
import UrlTable from "./UrlTable";
import { user } from "../Services/http-service_user";
import userService from "../Services/userService";
import { CONSTANTS } from "../Constants/appConstants";

export interface User_urls {
  alias: string;
  url: string;
}

export interface urlUpdate {
  alias: string;
  newUrl: string;
}

const Userpage = () => {
  const [error, setError] = useState("");
  const [copyStat, setCopyStat] = useState(false);
  const [copyError, setCopyError] = useState("");
  const { setItem: setUser } = useLocalStorage(CONSTANTS.USER_STORAGE_KEY);
  const { setItem: setStatus, getItem: getStatus } = useLocalStorage(
    CONSTANTS.USER_STATUS_KEY
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (getStatus() == "false") {
      console.log(getStatus());

      navigate("/login", { replace: true });
    }
  }, [getStatus()]);

  const [update, setUpdate] = useState("");

  const { data: urlinfo, error: FetchError } = useUrl();
  const { mutate, error: mutateError } = useAddUrl();
  const { mutate: mutateUpdate, error: mutateUpdateError } = useUpdateUrl();
  const { mutate: mutateDelete, error: mutateDeleteError } = useDeleteUrl();

  const toast = useToast();

  if (FetchError) setError(FetchError.message);

  const deleteUrl = (alias: string) => {
    mutateDelete(alias);
    if (mutateDeleteError) setError(mutateDeleteError.response.data.message);
  };

  const addUrl = (data: User_urls) => {
    mutate(data);

    if (mutateError) setError(mutateError.response.data.message);
    else {
      //toast message goes here
      toast({
        title: "Url Added",
        status: "success",
        duration: 5000, // 5 seconds
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleLogout = () => {
    userService.logout();
    navigate("/login", { replace: true });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopyStat(true);
      })
      .catch((err) => {
        setCopyError(err.message);
        setCopyStat(false);
      });
  };
  const handleUpdate = (newUrl: string, alias: string) => {
    mutateUpdate({ newUrl: newUrl, alias: alias });
    if (mutateUpdateError) setError(mutateUpdateError.response.data.message);
    else {
      toast({
        title: "Url updated",
        status: "success",
        duration: 5000, //5 seconds
        isClosable: true,
        position: "top",
      });
      setUpdate("");
    }
  };

  const { isOpen: isVisible, onClose: closeAlert } = useDisclosure({
    defaultIsOpen: true,
  });

  // if (!status) return <Navigate to={"/login"} replace={true}></Navigate>;
  console.log(getStatus());

  return (
    <Box marginTop={5}>
      {error && isVisible && (
        <Alert status="error" marginBottom={5} color="red">
          <AlertIcon />
          {error}

          <CloseButton
            position={"absolute"}
            right={5}
            onClick={closeAlert}
          ></CloseButton>
        </Alert>
      )}
      <HStack justifyContent={"right"}>
        <Text>
          <Button
            colorScheme="teal"
            leftIcon={<FaUserLarge />}
            onClick={() => {
              navigate("/userpage/profile");
            }}
            size={"sm"}
          ></Button>
        </Text>

        <Button
          colorScheme="red"
          size={"sm"}
          leftIcon={<CiLogout />}
          onClick={() => {
            //clearUser();

            // setUserStatus(false);
            setStatus(false);
            setUser({} as user);
            setError("");
            handleLogout();
          }}
        >
          Logout
        </Button>
      </HStack>
      <UrlTable
        deleteUrl={deleteUrl}
        handleCopy={handleCopy}
        handleUpdate={handleUpdate}
        setError={setError}
        setUpdate={setUpdate}
        update={update}
        urlinfo={urlinfo}
      ></UrlTable>

      <AddingUrl handleAdd={(data) => addUrl(data)}></AddingUrl>
    </Box>
  );
};

export default Userpage;
