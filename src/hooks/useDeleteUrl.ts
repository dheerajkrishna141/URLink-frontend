import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import LoginContext from "../StateManagement/LoginContext";
import urlService from "../Services/urlService";
import useLocalStorage from "./useLocalStorage";
import { CONSTANTS } from "../Constants/appConstants";
import { localUser } from "./useUrl";
import { useToast } from "@chakra-ui/react";

const useDeleteUrl = () => {
  const toast = useToast();
  const { getItem: getUser } = useLocalStorage(CONSTANTS.USER_STORAGE_KEY);
  const user: localUser = JSON.parse(getUser() || "");
  const queryClient = useQueryClient();
  return useMutation<string, any, string>({
    mutationFn: (alias: string) => {
      return urlService.delete({
        params: {
          alias: alias,
        },
      });
    },
    onSuccess: (successMessage, alias) => {
      queryClient.invalidateQueries({
        queryKey: ["users", user.id, "urls"],
      });
      toast({
        title: "Url Deleted",
        status: "info",
        duration: 3000, // 3 seconds
        isClosable: true,
        position: "top",
      });
    },
    onError: (error) => {
      toast({
        title: error.response.data.message,
        status: "error",
        duration: 5000, // 5 seconds
        isClosable: true,
        position: "top",
      });
    },
  });
};

export default useDeleteUrl;
