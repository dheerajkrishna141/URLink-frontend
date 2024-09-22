import { useMutation, useQueryClient } from "@tanstack/react-query";
import { urlUpdate } from "../Components/Userpage";
import urlService from "../Services/urlService";
import { useContext } from "react";
import LoginContext from "../StateManagement/LoginContext";
import useLocalStorage from "./useLocalStorage";
import { CONSTANTS } from "../Constants/appConstants";
import { localUser } from "./useUrl";

const useUpdateUrl = () => {
  const queryClient = useQueryClient();
  const { getItem: getUser } = useLocalStorage(CONSTANTS.USER_STORAGE_KEY);
  const user: localUser = JSON.parse(getUser() || "");
  return useMutation<string, any, urlUpdate>({
    mutationFn: (data: urlUpdate) => {
      return urlService.updateURL({ data: data });
    },

    onSuccess: (successMessage, data) => {
      queryClient.invalidateQueries({
        queryKey: ["users", user.id, "urls"],
      });
    },
  });
};

export default useUpdateUrl;
