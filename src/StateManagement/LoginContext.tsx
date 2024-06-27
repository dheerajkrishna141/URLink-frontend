import React from "react";
import { user } from "../Services/http-service_user";

export interface loginContextType {
  message: string | null;
  status: boolean | null;
  user: user;
  id: number | null;
  setId: React.Dispatch<React.SetStateAction<number | null>>;
  setStatus: React.Dispatch<React.SetStateAction<boolean | null>>;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setUser: React.Dispatch<React.SetStateAction<user>>;
}

const LoginContext = React.createContext<loginContextType>(
  {} as loginContextType
);

export default LoginContext;
