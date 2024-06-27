import React, { useRef } from "react";
import { User_urls } from "./Userpage";
import { Button, FormControl, HStack, Input, Td, Tr } from "@chakra-ui/react";
import ExpandableText from "./ExpandableText";

interface Props {
  data: User_urls;
  handleUpdate: (newUrl: string, alias: string) => void;
  handleCancel: () => void;
}
const UpdatingData = ({ data, handleUpdate, handleCancel }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <Tr key={data.alias}>
        <Td>{data.alias}</Td>
        <Td>
          <Input ref={ref} width={"auto"}></Input>
        </Td>
        <Td></Td>
        <Td>
          <HStack>
            <Button
              colorScheme="teal"
              variant={"outline"}
              size="sm"
              onClick={(ev) => {
                if (ref.current?.value)
                  handleUpdate(ref.current?.value, data.alias);
              }}
            >
              submit
            </Button>
            <Button
              size="sm"
              colorScheme="red"
              variant={"outline"}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </HStack>
        </Td>
      </Tr>
    </>
  );
};

export default UpdatingData;
