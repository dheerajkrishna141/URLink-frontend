import {
  Box,
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
import React, { useEffect } from "react";
import UpdatingData from "./UpdatingData";
import ExpandableText from "./ExpandableText";
import { User_urls } from "./Userpage";
import { CONSTANTS } from "../Constants/appConstants";
import CustomMessage from "./CustomMessage";
import { UrlFetchResponse } from "../Services/http-service";
import { useSearchParams } from "react-router-dom";
interface Props {
  urlinfo: UrlFetchResponse | undefined;
  update: string;
  setUpdate: (update: string) => void;
  handleUpdate: (newUrl: string, alias: string) => void;
  handleCopy: (text: string) => void;
  deleteUrl: (alias: string) => void;
}

const UrlTable = ({
  urlinfo,
  update,
  setUpdate,
  handleUpdate,
  handleCopy,
  deleteUrl,
}: Props) => {
  const base = CONSTANTS.BASE_URL + "/url";

  if (urlinfo?.content?.length == 0 && urlinfo.first) {
    return <CustomMessage></CustomMessage>;
  }
  return (
    <Box>
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
            {urlinfo?.content?.map((dat, index) =>
              update === dat.alias ? (
                <UpdatingData
                  key={index}
                  handleCancel={() => {
                    setUpdate("");
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
    </Box>
  );
};

export default UrlTable;
