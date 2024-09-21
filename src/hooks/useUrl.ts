import { useQuery } from "@tanstack/react-query";
import DTOfunction from "../Services/http-service";
import { useContext } from "react";
import LoginContext from "../StateManagement/LoginContext";
import { User_urls } from "../Components/Userpage";
import HTTPService from "../Services/http-service";
import urlService from "../Services/urlService";
import useLocalStorage from "./useLocalStorage";
import { CONSTANTS } from "../Constants/appConstants";

export interface localUser {
  id: number;
  firstname: string;
  lastname: string;
  role: {
    id: number;
    name: string;
    authority: string;
  };
}

const useUrl = () => {
  const { getItem } = useLocalStorage(CONSTANTS.USER_STORAGE_KEY);
  const user: localUser = JSON.parse(getItem() || "");
  return useQuery<User_urls[], Error>({
    queryKey: ["users", user.id, "urls"],
    queryFn: () => {
      return urlService.get();
    },

    staleTime: 15 * 60 * 60 * 1000, //15 mins
  });
};

export default useUrl;
