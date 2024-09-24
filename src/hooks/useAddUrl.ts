import { useMutation, useQueryClient } from "@tanstack/react-query";
import urlService from "../Services/urlService";
import { User_urls } from "../Components/Userpage";
import { useContext } from "react";
import LoginContext from "../StateManagement/LoginContext";
import Login from "../Components/Login";
import useLocalStorage from "./useLocalStorage";
import { CONSTANTS } from "../Constants/appConstants";
import { localUser } from "./useUrl";
import { useToast } from "@chakra-ui/react";

const useAddUrl = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { getItem: getUser } = useLocalStorage(CONSTANTS.USER_STORAGE_KEY);
  const user: localUser = JSON.parse(getUser() || "");
  return useMutation<User_urls, any, User_urls>({
    mutationFn: (data: User_urls) => {
      return urlService.addURL({
        data: data,
      });
    },
    onSuccess: (savedUrl, newUrl) => {
      //re-fetching to update cache
      queryClient.invalidateQueries({
        queryKey: ["users", user.id, "urls"],
      });
      toast({
        title: "Url Added",
        status: "success",
        duration: 3000, // 3 seconds
        isClosable: true,
        position: "top",
      });
    },
    onError: (error) => {
      toast({
        title: error.response.data.message,
        status: "error",
        duration: 5000, //5 seconds
        isClosable: true,
        position: "top",
      });
    },
  });
};

export default useAddUrl;
