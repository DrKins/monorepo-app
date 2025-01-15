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
  Text,
} from "@chakra-ui/react";
import {
  BsHandThumbsDownFill,
  BsHandThumbsUpFill,
  BsThreeDotsVertical,
} from "react-icons/bs";

export default function CardQuote({ content }: { content: string }) {
  return (
    <Card flex={1}>
      <CardBody display={"flex"} gap={5}>
        <Avatar
          borderWidth={"2px"}
          borderColor={"red.200"}
          size="sm"
          name="NN"
        />
        <Text>{content}</Text>
      </CardBody>
      <CardFooter display={"flex"} gap={5} justifyContent={"flex-end"}>
        <Button background={"transparent"} shadow={"sm"} disabled>
          <Icon as={BsHandThumbsUpFill} color={"green.300"} />
          {Math.round(Math.random() * 10)}
        </Button>
        <Button background={"transparent"} shadow={"sm"} disabled>
          <Icon as={BsHandThumbsDownFill} color={"gray"} />
          {Math.round(Math.random() * 1)}
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
