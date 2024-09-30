import {
  Box,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { z } from "zod";
import userService from "../Services/userService";
import { Navigate, useNavigate } from "react-router-dom";

const PasswordChange = () => {
  const schema = z
    .object({
      password: z
        .string()
        .min(6, { message: "Password must contain atleast 6 characters" }),
      re_enter_pass: z
        .string()
        .min(6, { message: "Password must contain atleast 6 characters" }),
    })
    .refine((data) => data.password === data.re_enter_pass, {
      message: "Passwords don't match",
      path: ["re_enter_pass"],
    });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const [pvisible, setPVisible] = useState(false);
  const toast = useToast();
  const handleChange = (data: FormData) => {
    toast.promise(
      userService
        .updatePassword({
          data: data.password,
        })
        .then(() => {
          navigate("/userpage");
        }),
      {
        success: {
          title: "Password Successfully Updated",
          duration: 5000, //5 seconds
          isClosable: true,
          position: "top",
        },
        error: {
          title: "Password cannot be changed at the moment",
          duration: 5000,
          isClosable: true,
          position: "top",
        },
        loading: {
          title: "Loading!",
          position: "top",
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        handleChange(data);
        reset();
      })}
    >
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
        </InputGroup>
        {errors.password && (
          <Text align={"left"} color={"red"}>
            {errors.password.message}
          </Text>
        )}
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
      <Box>
        <Button marginEnd={5} type="submit">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default PasswordChange;
