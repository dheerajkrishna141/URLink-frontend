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
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import userService from "../Services/userService";
import { user, userLogin } from "../Services/http-service_user";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link, Navigate, useNavigate } from "react-router-dom";
import LoginContext from "../StateManagement/LoginContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { CONSTANTS } from "../Constants/appConstants";

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
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { message } = useContext(LoginContext);
  const navigate = useNavigate();
  const [loginErr, setLoginErr] = useState("");
  const [pvisible, setPVisible] = useState(false);
  const { setItem: setUser } = useLocalStorage(CONSTANTS.USER_STORAGE_KEY);
  const { setItem: setStatus, getItem: getStatus } = useLocalStorage(
    CONSTANTS.USER_STATUS_KEY
  );
  const toast = useToast();

  useEffect(() => {
    if (getStatus() === "true") {
      userService.logout().then((res) => {
        toast({
          title: "Last session invalidated!",
          status: "info",
          duration: 5000, // 5 seconds
          isClosable: true,
          position: "top",
        });
      });
      setStatus(false);
      setUser({} as user);
    }
  }, [getStatus()]);

  const handleLogin = (data: userLogin) => {
    userService
      .login({
        auth: {
          username: data.userName,
          password: data.password,
        },
      })
      .then((data) => {
        console.log(data);
        setStatus(data.status);
        setUser(data.user);
        setLoginErr("");
        navigate("/userpage", { replace: true });
      })
      .catch((er) => {
        console.log(er);
        setLoginErr(er.response.data.message);
      });
  };

  return (
    <>
      {/* {getStatus() === "false" && message && (
        <Alert status="error" variant={"left-accent"} color={"orangered"}>
          <AlertIcon />
          {message}
        </Alert>
      )} */}
      {loginErr && (
        <Alert status="error" variant={"left-accent"} color={"orangered"}>
          <AlertIcon />
          {loginErr}
        </Alert>
      )}

      <form
        onSubmit={handleSubmit((data) => {
          handleLogin(data);
          // reset();
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
