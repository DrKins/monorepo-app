import { Button, Flex, Icon, Input, Select, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { BsPlusCircleFill } from "react-icons/bs";

export default function HeaderControlls({
  handleOpen,
  isOpen,
}: {
  handleOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}) {
  return (
    <Flex
      transition="all 0.35s"
      flexDirection={{ base: "column-reverse", md: "row" }}
      gap={5}
      mb={isOpen ? 5 : 0}>
      <Input
        placeholder="Search cards"
        width={{ base: "unset", md: "300px" }}
        _placeholder={{ color: "gray.400" }}
      />

      <Select width={{ base: "unset", md: "300px" }} defaultValue={"option3"}>
        <option value="option1">Top rated</option>
        <option value="option2">Worst rated</option>
        <option value="option3">Most recent</option>
      </Select>

      <Button
        background={"green.300"}
        gap={2}
        onClick={() => handleOpen(!isOpen)}>
        <Icon as={BsPlusCircleFill} />
        <Text>Create card</Text>
      </Button>
    </Flex>
  );
}
