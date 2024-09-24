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
import { useToast } from "@chakra-ui/react";

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
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const { getItem } = useLocalStorage(CONSTANTS.USER_STORAGE_KEY);
  const user: localUser = JSON.parse(getItem() || "");
  var pageNo = parseInt(searchParams.get("pageNo") || "0");
  if (pageNo < 0) {
    pageNo = 0;
  }
  return useQuery<UrlFetchResponse, any>({
    queryKey: ["users", user.id, "urls", pageNo],
    queryFn: () => {
      return urlService.get({
        params: {
          pageNo: pageNo,
        },
      });
    },

    staleTime: 15 * 60 * 60 * 1000, //15 mins
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

export default useUrl;
