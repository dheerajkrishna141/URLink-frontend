import { useMutation, useQueryClient } from "@tanstack/react-query"
import { urlUpdate } from "../Components/Userpage"
import urlService from "../Services/urlService"
import { useContext } from "react"
import LoginContext from "../StateManagement/LoginContext"

const useUpdateUrl =()=>{
    const {id} = useContext(LoginContext)
    const queryClient =useQueryClient()
    return useMutation<string,any,urlUpdate>({
        mutationFn: ( data: urlUpdate)=>{
                return urlService.updateURL(JSON.stringify(id), data);
        },

        onSuccess:(successMessage, data)=>{
                queryClient.invalidateQueries({
                    queryKey:["users",id,"urls" ]
                })
        }
    })
}

export default useUpdateUrl;