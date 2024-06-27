import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useContext } from "react"
import LoginContext from "../StateManagement/LoginContext"
import urlService from "../Services/urlService"

const useDeleteUrl = ()=>{

    const {id} = useContext(LoginContext)
    const queryClient = useQueryClient()
    return useMutation<string, any,string>({
        mutationFn: (alias:string)=>{
            return urlService.delete(JSON.stringify(id), alias)
        },
        onSuccess: (successMessage,alias)=>{
            queryClient.invalidateQueries({
                queryKey: ["users", id,"urls"]
            })
        }
    })
    
}

export default useDeleteUrl