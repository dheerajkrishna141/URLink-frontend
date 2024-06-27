import { useQuery } from "@tanstack/react-query";
import DTOfunction from "../Services/http-service"
import { useContext } from "react";
import LoginContext from "../StateManagement/LoginContext";
import { User_urls } from "../Components/Userpage";
import HTTPService from "../Services/http-service";
import urlService from "../Services/urlService";
import useLocalStorage from "./useLocalStorage";

const useUrl= ()=>{
    
        const {getItem: getUserId}= useLocalStorage("userId");
        const id = parseInt(getUserId()||"-1")
       
        
   return useQuery<User_urls[],Error>({
        queryKey: ["users", id, "urls"],
        queryFn:()=>{
            return urlService.get(JSON.stringify(id));

        }, 
        
        
       
        staleTime: 15 * 60 * 60 * 1000 //15 mins
    })
}

export default useUrl