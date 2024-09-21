import { Axios, AxiosRequestConfig } from "axios"
import { User_urls, urlUpdate } from "../Components/Userpage"
import apiClient from "./api-client"

class HTTPService<User_urls>{

    endpoint: string
    constructor(endpoint: string){
        this.endpoint= endpoint
    }

    get(){
        return  apiClient.get<User_urls[]>(this.endpoint).then((res)=>res.data)
        
    }

    delete(alias: string, config: AxiosRequestConfig){
        return apiClient.delete<string>(this.endpoint+"/"+alias, config).then((res)=>res.data)
        

    }

    // addURL(id:string,data: User_urls){
    //     return apiClient.post<User_urls>(this.endpoint+"/"+id, data).then((res)=> res.data)
    // }
    addURL( config: AxiosRequestConfig){
        return apiClient.post<User_urls>(this.endpoint, config.data).then((res)=> res.data)
    
    }
    updateURL( config: AxiosRequestConfig){
        return apiClient.post<string>(this.endpoint+"/update/", config).then((res)=>res.data)
    }

}
    const DTOfunction = (endpoint: string)=>new HTTPService<User_urls>(endpoint);
    export default DTOfunction