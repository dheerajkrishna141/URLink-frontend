import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import userService from "../Services/userService";
import { user, userLogin } from "../Services/http-service_user";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import apiClient from "../Services/api-client";
import {
  Link,
  Navigate,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import LoginContext from "../StateManagement/LoginContext";
import useLocalStorage from "../hooks/useLocalStorage";

const schema = z.object({
  userName: z.string().email({ message: "Enter a valid Email" }),
  password: z
    .string()
    .min(6, { message: "Password must contain atleast 6 characters" }),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { setStatus, user, id, message, setId, setMessage, status } =
    useContext(LoginContext);

  const [loginErr, setLoginErr] = useState("");
  const [pvisible, setPVisible] = useState(false);
  const { setItem: setUserStatus, getItem: getUserStatus } =
    useLocalStorage("userStatus");
  const { setItem: setUser, getItem: getUser } = useLocalStorage("user");
  const { setItem: setUserId, getItem: getUserId } = useLocalStorage("userId");
  const handleLogin = (data: userLogin) => {
    userService
      .login(data)
      .then((data) => {
        console.log(data.user);

        setStatus(data.status);
        setUserStatus(data.status);
        setUser(data.user);
        setUserId(data.user.id);
        setId(data.user.id);
        setUser({
          firstname: data.user.firstname,
          lastname: data.user.lastname,
          password: data.user.password,
          username: data.user.username,
        });

        setLoginErr("");
      })
      .catch((er) => {
        setLoginErr(er.response.data.message);
      });
  };
  if (status) return <Navigate to={"/userpage"} replace={true}></Navigate>;

  return (
    <>
      {status === false && message && (
        <Alert status="error" variant={"left-accent"} color={"orangered"}>
          <AlertIcon />
          {message}
        </Alert>
      )}
      {loginErr && (
        <Alert status="error" variant={"left-accent"} color={"orangered"}>
          <AlertIcon />
          {loginErr}
        </Alert>
      )}

      <form
        onSubmit={handleSubmit((data) => {
          handleLogin(data);
          reset();
        })}
      >
        <Box marginBottom={5}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input {...register("userName")} type="email" id="EmailId"></Input>
          {errors.userName && (
            <Text align="left" color={"red"}>
              {errors.userName.message}
            </Text>
          )}
        </Box>
        <Box marginBottom={5}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup>
            <Input
              {...register("password")}
              type={pvisible ? "text" : "password"}
              id="password"
            ></Input>
            <InputRightElement>
              <MdOutlineRemoveRedEye
                size={25}
                onClick={() => setPVisible(!pvisible)}
              />
            </InputRightElement>
            {errors.password && (
              <Text align="left" color={"red"}>
                {errors.password.message}
              </Text>
            )}
          </InputGroup>
        </Box>
        <HStack justifyContent={"center"}>
          <Button marginEnd={5} type="submit">
            Submit
          </Button>
          <Link to={"/register"}>Not registered?click here</Link>
        </HStack>
      </form>
    </>
  );
};

export default Login;
