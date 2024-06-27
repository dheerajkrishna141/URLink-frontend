import { useMutation, useQueryClient } from "@tanstack/react-query"
import urlService from "../Services/urlService"
import { User_urls } from "../Components/Userpage"
import { useContext } from "react"
import LoginContext from "../StateManagement/LoginContext"
import Login from "../Components/Login"



const useAddUrl= ()=>{
    const {id} = useContext(LoginContext)
        const queryClient =  useQueryClient()
   return useMutation<User_urls, any,User_urls>({
        mutationFn: ( data:User_urls)=>{
           return urlService.addURL(JSON.stringify(id), data)
        }
        ,
        onSuccess:(savedUrl, newUrl)=>{
            //re-fetching to update cache
            queryClient.invalidateQueries({
                queryKey:["users", id,"urls"]
            })
        
            
        },
      
        
    })
  
}

export default useAddUrl