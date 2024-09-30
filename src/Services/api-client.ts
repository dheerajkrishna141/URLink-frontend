import axios from "axios";
import { CONSTANTS } from "../Constants/appConstants";

export default axios.create({
  baseURL: CONSTANTS.BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
