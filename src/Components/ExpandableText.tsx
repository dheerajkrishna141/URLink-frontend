import { Button, HStack, Text } from "@chakra-ui/react";
import React, { ReactNode, useState } from "react";

interface Props {
  children: string;
  maxChar?: number;
}

const ExpandableText = ({ children, maxChar = 20 }: Props) => {
  const [isClicked, setIsClicked] = useState(false);
  if (children.length > maxChar) {
    const link = children.substring(0, maxChar);

    if (!isClicked) {
      return (
        <>
          <HStack>
            <Text>{link}...</Text>
            <Button size={"sm"} onClick={() => setIsClicked(!isClicked)}>
              more
            </Button>
          </HStack>
        </>
      );
    } else {
      return (
        <>
          <HStack>
            <Text>{children}</Text>
            <Button size={"sm"} onClick={() => setIsClicked(!isClicked)}>
              less
            </Button>
          </HStack>
        </>
      );
    }
  }
  return (
    <div>
      <p>{children}</p>
    </div>
  );
};

export default ExpandableText;
