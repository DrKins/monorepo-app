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

export default function CardQuote() {
  return (
    <Card maxWidth={{ base: "unset", lg: "300px" }}>
      <CardBody display={"flex"} gap={5}>
        <Avatar
          borderWidth={"2px"}
          borderColor={"green.200"}
          size="sm"
          name="Ryan Florence"
        />
        <Text>View a summary of all your customers over the last month.</Text>
      </CardBody>
      <CardFooter display={"flex"} gap={5} justifyContent={"flex-end"}>
        <Button background={"transparent"} shadow={"sm"}>
          <Icon as={BsHandThumbsUpFill} color={"green.300"} />
          {Math.round(Math.random() * 10)}
        </Button>
        <Button background={"transparent"} shadow={"sm"}>
          <Icon as={BsHandThumbsDownFill} color={"gray"} />
          {Math.round(Math.random() * 1)}
        </Button>
        <Menu>
          <MenuButton
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
