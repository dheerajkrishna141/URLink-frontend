import { Button, HStack, Text, Box, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AddingUrl from "./AddingUrl";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

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
import Pagination from "./Pagination";

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
  const { setItem: setUser } = useLocalStorage(CONSTANTS.USER_STORAGE_KEY);
  const { setItem: setStatus, getItem: getStatus } = useLocalStorage(
    CONSTANTS.USER_STATUS_KEY
  );
  const navigate = useNavigate();

  const [update, setUpdate] = useState("");

  const { data: urlinfo } = useUrl();
  const { mutate } = useAddUrl();
  const { mutate: mutateUpdate } = useUpdateUrl();
  const { mutate: mutateDelete } = useDeleteUrl();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNo = parseInt(searchParams.get("pageNo") || "1");

  const toast = useToast();
  useEffect(() => {
    if (getStatus() == "false") {
      navigate("/login", { replace: true });
    }

    if (pageNo > (urlinfo?.totalPages || Number.MAX_VALUE)) {
      setSearchParams({ pageNo: String((urlinfo?.totalPages || 1) - 1) });
    }
  }, [getStatus, searchParams]);

  const deleteUrl = (alias: string) => {
    mutateDelete(alias);
  };

  const addUrl = (data: User_urls) => {
    mutate(data);
  };

  const handleLogout = () => {
    userService.logout();
    navigate("/login", { replace: true });
  };

  const handleCopy = (text: string) => {
    toast.promise(navigator.clipboard.writeText(text), {
      success: {
        title: "Url Copied",
        colorScheme: "teal",
        variant: "subtle",
        duration: 2000, // 2 seconds
        isClosable: true,
        position: "bottom",
      },
      error: {
        title: "Error copying",
        variant: "subtle",
        duration: 2000, // 2 seconds
        isClosable: true,
        position: "bottom",
      },
      loading: {},
    });
  };
  const handleUpdate = (newUrl: string, alias: string) => {
    mutateUpdate({ newUrl: newUrl, alias: alias });
    setUpdate("");
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({
      pageNo: String(newPage - 1),
    });
  };

  if (getStatus() == "false") {
    return <Navigate to={"/login"} replace={true}></Navigate>;
  }

  return (
    <Box marginTop={5} p={5}>
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
            setStatus(false);
            setUser({} as user);
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
        setUpdate={setUpdate}
        update={update}
        urlinfo={urlinfo}
      ></UrlTable>

      <Box hidden={urlinfo?.content.length == 0}>
        <Pagination
          currentPage={pageNo}
          onPageChange={handlePageChange}
          totalPages={urlinfo?.totalPages || 1}
        ></Pagination>
      </Box>

      <Box marginTop={10}>
        <AddingUrl handleAdd={(data) => addUrl(data)}></AddingUrl>
      </Box>
    </Box>
  );
};

export default Userpage;
