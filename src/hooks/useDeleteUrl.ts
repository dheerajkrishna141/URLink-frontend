import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import LoginContext from "../StateManagement/LoginContext";
import urlService from "../Services/urlService";
import useLocalStorage from "./useLocalStorage";
import { CONSTANTS } from "../Constants/appConstants";
import { localUser } from "./useUrl";

const useDeleteUrl = () => {
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
    },
  });
};

export default useDeleteUrl;
