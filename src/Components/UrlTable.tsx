import {
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import UpdatingData from "./UpdatingData";
import ExpandableText from "./ExpandableText";
import { User_urls } from "./Userpage";
import { CONSTANTS } from "../Constants/appConstants";
interface Props {
  urlinfo: User_urls[] | undefined;
  update: string;
  setUpdate: (update: string) => void;
  setError: (error: string) => void;
  handleUpdate: (newUrl: string, alias: string) => void;
  handleCopy: (text: string) => void;
  deleteUrl: (alias: string) => void;
}
const UrlTable = ({
  urlinfo,
  update,
  setUpdate,
  setError,
  handleUpdate,
  handleCopy,
  deleteUrl,
}: Props) => {
  const base = CONSTANTS.BASE_URL + "/url";

  return (
    <div>
      <TableContainer marginBottom={4} marginLeft={10}>
        <Table colorScheme="gray" variant={"simple"}>
          <TableCaption>URL'S</TableCaption>
          <Thead>
            <Tr>
              <Th>Alias</Th>
              <Th>Original URL</Th>
              <Th>Shortnened URL</Th>
            </Tr>
          </Thead>
          <Tbody>
            {urlinfo?.map((dat, index) =>
              update === dat.alias ? (
                <UpdatingData
                  handleCancel={() => {
                    setUpdate("");
                    setError("");
                  }}
                  data={dat}
                  handleUpdate={handleUpdate}
                />
              ) : (
                <Tr key={index}>
                  <Td>{dat.alias}</Td>
                  <Td>
                    <ExpandableText>{dat.url}</ExpandableText>
                  </Td>
                  <Td>{base + "/" + dat.alias}</Td>
                  <Td>
                    <ButtonGroup justifyContent={"space-between"}>
                      <Button
                        onClick={() => {
                          handleCopy(base + "/" + dat.alias);
                        }}
                        size="sm"
                        variant="outline"
                        colorScheme="teal"
                      >
                        Copy
                      </Button>

                      <Button
                        onClick={() => {
                          deleteUrl(dat.alias);
                        }}
                        size="sm"
                        variant="outline"
                        colorScheme="red"
                      >
                        Delete
                      </Button>

                      <Button
                        onClick={() => setUpdate(dat.alias)}
                        size="sm"
                        variant="outline"
                        colorScheme="blue"
                      >
                        Update
                      </Button>
                    </ButtonGroup>
                  </Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UrlTable;
