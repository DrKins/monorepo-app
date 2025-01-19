import { Button, Text } from "@chakra-ui/react";
import { useState } from "react";

type HandleContextComponentProps = {
  text: string;
};
export function HandleContextComponent({ text }: HandleContextComponentProps) {
  const [showMore, setShowMore] = useState(false);
  const shouldShowMore = text.length > 50;
  const handleClick = () => {
    setShowMore(!showMore);
  };

  return (
    <Text
      noOfLines={showMore ? undefined : 5}
      overflow="hidden"
      textOverflow="ellipsis"
      width={"100%"}>
      {shouldShowMore && (
        <>
          <span>
            {text.substring(0, showMore ? text.length : 50)}
            {showMore ? "" : "..."}
          </span>
          <br />
          <Button
            variant="link"
            colorScheme="blue"
            size="sm"
            onClick={handleClick}>
            {showMore ? "View less" : "View more"}
          </Button>
        </>
      )}
      {!shouldShowMore && text}
    </Text>
  );
}
