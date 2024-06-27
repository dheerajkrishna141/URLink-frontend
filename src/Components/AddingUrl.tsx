import {
  Box,
  Button,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { User_urls } from "./Userpage";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  alias: z
    .string()
    .min(3, { message: "Alias must be atleast 3 characters long" }),
  url: z.string().url({ message: "Enter a valid url" }),
});
type FormData = z.infer<typeof schema>;

interface Props {
  handleAdd: (data: FormData) => void;
}
const AddingUrl = ({ handleAdd }: Props) => {
  const { register, formState, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          handleAdd(data);
          reset();
        })}
      >
        <Box>
          <HStack>
            <VStack>
              <FormLabel whiteSpace={"nowrap"} htmlFor="newUrl">
                Enter a new URL
              </FormLabel>
              <Input
                {...register("url")}
                variant="filled"
                htmlSize={40}
                borderRadius={20}
                id="newUrl"
              ></Input>
              {formState.errors.url && (
                <Text color="red">{formState.errors.url.message}</Text>
              )}
            </VStack>
            <VStack>
              <FormLabel whiteSpace={"nowrap"} htmlFor="alias">
                Enter an alias
              </FormLabel>
              <Input
                htmlSize={30}
                {...register("alias")}
                variant="filled"
                borderRadius={20}
                id="alias"
              ></Input>
              {formState.errors.alias && (
                <Text color="red">{formState.errors.alias.message}</Text>
              )}
            </VStack>
            <HStack>
              <Button colorScheme="teal" size="md" marginTop={9} type="submit">
                ADD
              </Button>
              <Button
                colorScheme="orange"
                variant={"outline"}
                size="md"
                marginTop={9}
                onClick={() => {
                  reset();
                }}
              >
                Cancel
              </Button>
            </HStack>
          </HStack>
        </Box>
      </form>
    </div>
  );
};

export default AddingUrl;
