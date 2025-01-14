import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  return (
    <Box
      marginLeft={{ base: "0", lg: "auto" }}
      display={"flex"}
      gap={2}
      alignItems={"center"}>
      <Menu>
        <Text>Profile</Text>
        <MenuButton
          padding={0}
          margin={0}
          display={"block"}
          borderRadius={"full"}
          as={Button}
          iconSpacing={0}
          rightIcon={
            <Avatar
              borderWidth={"2px"}
              borderColor={"green.200"}
              size="sm"
              name="Ryan Florence"
            />
          }
        />
        <MenuList color={"black"}>
          <MenuItem>Edit Profile</MenuItem>
          <MenuItem color={"red.400"} onClick={() => navigate("/login")}>
            Log out
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
