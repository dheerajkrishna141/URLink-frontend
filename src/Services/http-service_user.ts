import apiClient from "./api-client";

export interface user{
    username: string,
    password: string,
    firstname: string,
    lastname: string
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

    register(user: user){
        return apiClient.post<fetchedUser>(this.endpoint+"/register", user);
    }

    login(user: userLogin){
        return apiClient.post<FetchResponse>(this.endpoint+"/login", user).then((res)=>res.data);
    }


}
const DTOuserfunction=(endpoint:string) => new HTTPService(endpoint);

export default DTOuserfunction;