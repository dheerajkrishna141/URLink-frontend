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
import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
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
import CustomMessage from "./CustomMessage";
import { Pagination } from "@mui/material";
import NotFound from "./NotFound";

export interface User_urls {
  alias: string;
  url: string;
  last?: boolean | null;
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

  const [update, setUpdate] = useState("");

  const { data: urlinfo, error: FetchError } = useUrl();
  const { mutate, error: mutateError } = useAddUrl();
  const { mutate: mutateUpdate, error: mutateUpdateError } = useUpdateUrl();
  const { mutate: mutateDelete, error: mutateDeleteError } = useDeleteUrl();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNo = parseInt(searchParams.get("pageNo") || "1");

  const toast = useToast();
  useEffect(() => {
    if (getStatus() == "false") {
      navigate("/login", { replace: true });
    }

    if (pageNo < 0 || pageNo > (urlinfo?.totalPages || Number.MAX_VALUE)) {
      console.log(pageNo);

      setSearchParams({ pageNo: String(0) });
    }
  }, [getStatus, searchParams]);

  if (FetchError) setError(FetchError.message);

  const deleteUrl = (alias: string) => {
    mutateDelete(alias);
    if (mutateDeleteError) setError(mutateDeleteError.response.data.message);
    else {
      toast({
        title: "Url Deleted",
        status: "info",
        duration: 3000, // 3 seconds
        isClosable: true,
        position: "top",
      });
    }
  };

  const addUrl = (data: User_urls) => {
    mutate(data);

    if (mutateError) setError(mutateError.response.data.message);
    else {
      //toast message goes here
      toast({
        title: "Url Added",
        status: "success",
        duration: 3000, // 3 seconds
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
        toast({
          title: "Url Copied",
          status: "info",
          duration: 2000, // 2 seconds
          isClosable: true,
          position: "bottom",
        });
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
        duration: 3000, //3 seconds
        isClosable: true,
        position: "top",
      });
      setUpdate("");
    }
  };

  const { isOpen: isVisible, onClose: closeAlert } = useDisclosure({
    defaultIsOpen: true,
  });

  if (getStatus() == "false") {
    return <Navigate to={"/login"} replace={true}></Navigate>;
  }

  return (
    <Box marginTop={5} p={5}>
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
          >
            Profile
          </Button>
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
      <Button
        hidden={urlinfo?.first}
        onClick={() => {
          setSearchParams({
            pageNo: String(pageNo - 1),
          });
        }}
      >
        Previous
      </Button>
      <Button
        hidden={urlinfo?.last}
        onClick={() => {
          setSearchParams({
            pageNo: String(pageNo + 1),
          });
        }}
      >
        Next
      </Button>
      <AddingUrl handleAdd={(data) => addUrl(data)}></AddingUrl>
    </Box>
  );
};

export default Userpage;
