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
    setFilters({ ...filters, search: "" });
  };

  useEffect(() => {
    if (searchInput === "") {
      setFilters({ ...filters, search: "" });
    }
  }, [searchInput]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setFilters({ ...filters, search: debouncedSearchTerm, page: 1 });
    }
  }, [debouncedSearchTerm]);
  return (
    <Flex
      mb={5}
      transition="all 0.1s"
      flexDirection={{ base: "column-reverse", md: "row" }}
      gap={5}>
      <InputGroup width={{ base: "100%", md: "fit-content" }}>
        {searchInput && (
          <InputRightElement onClick={handleReset}>
            <DeleteIcon color="red.200" cursor={"pointer"} />
          </InputRightElement>
        )}
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search cards"
          width={{ base: "100%", md: "300px" }}
          _placeholder={{ color: "gray.400" }}
        />
      </InputGroup>

      <Select
        onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        width={{ base: "unset", md: "300px" }}
        defaultValue={"recent"}>
        <option value="mine">Sort by My cards</option>
        <option value="oldest">Sort by Most oldest</option>
        <option value="recent">Sort by Most recent</option>
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
