import { AxiosRequestConfig } from "axios"
import { User_urls, urlUpdate } from "../Components/Userpage"
import apiClient from "./api-client"

class HTTPService<User_urls>{

    endpoint: string
    constructor(endpoint: string){
        this.endpoint= endpoint
    }

    get(id:string){
        return  apiClient.get<User_urls[]>(this.endpoint+"/"+id).then((res)=>res.data)
        
    }

    delete(id:string, alias: string){
        return apiClient.delete<string>(this.endpoint+"/"+id+"/"+alias).then((res)=>res.data)
        

    }

    addURL(id:string,data: User_urls){
        return apiClient.post<User_urls>(this.endpoint+"/"+id, data).then((res)=> res.data)
    
    }
    updateURL(id:string, data: urlUpdate){
        return apiClient.post<string>(this.endpoint+"/update/"+id, data).then((res)=>res.data)
    }

}
    const DTOfunction = (endpoint: string)=>new HTTPService<User_urls>(endpoint);
    export default DTOfunction