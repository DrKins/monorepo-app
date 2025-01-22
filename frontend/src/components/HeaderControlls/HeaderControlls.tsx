import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { useFiltersContext } from "../../context/FiltersContext";
import useDebounce from "../../hooks/useDebounce";

type HeaderControllsProps = {
  handleOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
};

export default function HeaderControlls({
  handleOpen,
  isOpen,
}: HeaderControllsProps) {
  const { filters, setFilters } = useFiltersContext();
  const [searchInput, setSearchInput] = useState<string>(filters.search || "");
  const debouncedSearchTerm = useDebounce(searchInput, 300);

  const handleReset = () => {
    setSearchInput("");
    setFilters({ search: "" });
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      setFilters({ ...filters, search: debouncedSearchTerm });
    }
  }, [debouncedSearchTerm]);
  return (
    <Flex
      transition="all 0.35s"
      flexDirection={{ base: "column-reverse", md: "row" }}
      gap={5}
      mb={isOpen ? 5 : 0}>
      <InputGroup width={"fit-content"}>
        {searchInput && (
          <InputRightElement onClick={handleReset}>
            <DeleteIcon color="red.200" cursor={"pointer"} />
          </InputRightElement>
        )}
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search cards"
          width={{ base: "unset", md: "300px" }}
          _placeholder={{ color: "gray.400" }}
        />
      </InputGroup>

      <Select
        disabled
        width={{ base: "unset", md: "300px" }}
        defaultValue={"option3"}>
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
