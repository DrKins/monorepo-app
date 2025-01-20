import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  BsHandThumbsDownFill,
  BsHandThumbsUpFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { useReaction } from "../../hooks/useReaction";
import { SuccessResponseCardType } from "../../types/successTypes";
import { getColorFromEmail } from "../../utils/getColorFromEmail";
import { HandleContextComponent } from "../ViewMoreText/ViewMoreText";

type CardQuoteProps = {
  info: SuccessResponseCardType;
};

export default function CardQuote({
  info: {
    content,
    owner: { email },
    id,
    isLikedByCurrentUser,
    isDislikedByCurrentUser,
    totalLikes,
    totalDislikes,
  },
}: CardQuoteProps) {
  const { mutate, isPending } = useReaction();
  const handleReaction = (type: "like" | "dislike") => {
    mutate({ type, id });
  };

  return (
    <Card flex={1} height={"100%"} background={"whiteAlpha.900"} maxWidth={400}>
      <CardBody display={"flex"} gap={5}>
        <Avatar
          borderWidth={"2px"}
          borderColor={getColorFromEmail(email)}
          size="sm"
          name={email}
        />
        <HandleContextComponent text={content} />
      </CardBody>
      <CardFooter display={"flex"} gap={5} justifyContent={"flex-end"}>
        <Button
          _hover={{
            bg: isLikedByCurrentUser ? "green.100" : "green.200",
          }}
          isLoading={isPending}
          background={isLikedByCurrentUser ? "green.100" : "transparent"}
          shadow={"sm"}
          onClick={() => handleReaction("like")}>
          <Icon as={BsHandThumbsUpFill} color={"green.300"} />
          {totalLikes}
        </Button>
        <Button
          _hover={{
            bg: isDislikedByCurrentUser ? "red.100" : "red.200",
          }}
          isLoading={isPending}
          background={isDislikedByCurrentUser ? "red.100" : "transparent"}
          shadow={"sm"}
          onClick={() => handleReaction("dislike")}>
          <Icon as={BsHandThumbsDownFill} color={"red.300"} />
          {totalDislikes}
        </Button>
        <Menu>
          <MenuButton
            disabled
            as={Button}
            iconSpacing={0}
            rightIcon={<BsThreeDotsVertical />}
          />
          <MenuList>
            <MenuItem>Copy</MenuItem>
            <MenuItem color={"red.400"}>Delete</MenuItem>
          </MenuList>
        </Menu>
      </CardFooter>
    </Card>
  );
}
