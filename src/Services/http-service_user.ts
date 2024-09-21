import { AxiosRequestConfig } from "axios";
import apiClient from "./api-client";

export interface user{
    userName: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string[]
}
interface fetchedUser extends user{
    id: number
}

export interface userLogin{
    userName: string,
    password: string,
}


interface FetchResponse{
    message: string,
    status: boolean,
    user: fetchedUser
}

class HTTPService{

     

    endpoint: string;
   
    constructor( endpoint: string){
       
        this.endpoint = endpoint;
    }

    register(config : AxiosRequestConfig){
        return apiClient.post<fetchedUser>(this.endpoint+"/register", config.data).then((res)=> res.data);
    }

    login(config: AxiosRequestConfig){
        return apiClient.get<FetchResponse>(this.endpoint+"/login", config).then((res)=>res.data);
    }

    logout(){
        return apiClient.get("/logout");
    }


}
const DTOuserfunction=(endpoint:string) => new HTTPService(endpoint);

export default DTOuserfunction;