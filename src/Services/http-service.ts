import { Axios, AxiosRequestConfig } from "axios";
import { User_urls, urlUpdate } from "../Components/Userpage";
import apiClient from "./api-client";

export interface UrlFetchResponse {
  content: User_urls[];
  totalPages: number;
  last: boolean;
  first: boolean;
}
class HTTPService {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get(config: AxiosRequestConfig) {
    return apiClient
      .get<UrlFetchResponse>(this.endpoint, config)
      .then((res) => res.data);
  }

  delete(config: AxiosRequestConfig) {
    return apiClient
      .delete<string>(this.endpoint, config)
      .then((res) => res.data);
  }

  addURL(config: AxiosRequestConfig) {
    return apiClient
      .post<User_urls>(this.endpoint, config.data)
      .then((res) => res.data);
  }
  updateURL(config: AxiosRequestConfig) {
    return apiClient
      .post<string>(this.endpoint + "/update", config.data)
      .then((res) => res.data);
  }
}
const DTOfunction = (endpoint: string) => new HTTPService(endpoint);
export default DTOfunction;
