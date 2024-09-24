import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import DTOfunction, { UrlFetchResponse } from "../Services/http-service";
import { useContext } from "react";
import LoginContext from "../StateManagement/LoginContext";
import { User_urls } from "../Components/Userpage";
import HTTPService from "../Services/http-service";
import urlService from "../Services/urlService";
import useLocalStorage from "./useLocalStorage";
import { CONSTANTS } from "../Constants/appConstants";
import { useParams, useSearchParams } from "react-router-dom";

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
  const [searchParams] = useSearchParams();
  const { getItem } = useLocalStorage(CONSTANTS.USER_STORAGE_KEY);
  const user: localUser = JSON.parse(getItem() || "");
  const pageNo = searchParams.get("pageNo");
  return useQuery<UrlFetchResponse, Error>({
    queryKey: ["users", user.id, "urls", pageNo],
    queryFn: () => {
      return urlService.get({
        params: {
          pageNo: pageNo,
        },
      });
    },

    staleTime: 15 * 60 * 60 * 1000, //15 mins
  });
};

export default useUrl;
