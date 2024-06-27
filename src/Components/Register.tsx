import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Schema, z } from "zod";
import userService from "../Services/userService";
import { Link } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const schema = z
  .object({
    email: z.string().email({ message: "Enter a valid email." }),
    firstname: z.string().min(4, { message: "Enter atleast 4 characters" }),
    lastname: z.string().min(4, { message: "Enter atleast 4 characters" }),

    password: z.string().min(6, { message: "Enter atleast 6 characters" }),
    re_enter_pass: z.string().min(6, { message: "Enter atleast 6 characters" }),
  })
  .refine((data) => data.password === data.re_enter_pass, {
    message: "Passwords don't match",
    path: ["re_enter_pass"],
  });

type FormData = z.infer<typeof schema>;

const Register = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [pvisible, setPVisible] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handlereg = (data: FormData) => {
    userService
      .register({
        username: data.email,
        password: data.password,
        firstname: data.firstname,
        lastname: data.lastname,
      })
      .then((res) => {
        setError("");
        setMessage("User successfully created! click on login to continue.");
        console.log(res);
      })
      .catch((err) => {
        setMessage("");
        setError(err.response.data.message);
      });
    console.log(data);
  };

  return (
    <div>
      {message && (
        <Alert status="success">
          <AlertIcon />
          {message}
        </Alert>
      )}
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}
      <form
        onSubmit={handleSubmit((data) => {
          handlereg(data);
          reset();
        })}
      >
        <Box marginBottom={5} marginTop={10}>
          <FormLabel htmlFor="EmailId">Username (Email Id)</FormLabel>
          <Input {...register("email")} type="email" id="EmailId"></Input>
          {errors.email && (
            <Text align="left" color={"red"}>
              {errors.email.message}
            </Text>
          )}
        </Box>
        <Box marginBottom={5} marginTop={10}>
          <FormLabel htmlFor="FirsName">First Name</FormLabel>
          <Input {...register("firstname")} type="text" id="FirstName"></Input>
          {errors.firstname && (
            <Text align="left" color={"red"}>
              {errors.firstname.message}
            </Text>
          )}
        </Box>
        <Box marginBottom={5} marginTop={10}>
          <FormLabel htmlFor="LastName">Last Name</FormLabel>
          <Input {...register("lastname")} type="text" id="LastName"></Input>
          {errors.lastname && (
            <Text align="left" color={"red"}>
              {errors.lastname.message}
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
                onClick={() => setPVisible(!pvisible)}
                size={25}
              />
            </InputRightElement>
            {errors.password && (
              <Text align="left" color={"red"}>
                {errors.password.message}
              </Text>
            )}
          </InputGroup>
        </Box>
        <Box marginBottom={5}>
          <FormLabel htmlFor="re-enter password">Re-Password</FormLabel>
          <Input
            {...register("re_enter_pass")}
            type={pvisible ? "text" : "password"}
            id="re-enter password"
          ></Input>
          {errors.re_enter_pass && (
            <Text align="left" color={"red"}>
              {errors.re_enter_pass.message}
            </Text>
          )}
        </Box>

        <Button type="submit">Submit</Button>
      </form>
      <Link to={"/Login"}>
        <Button marginTop={10}>Login</Button>
      </Link>
    </div>
  );
};

export default Register;
