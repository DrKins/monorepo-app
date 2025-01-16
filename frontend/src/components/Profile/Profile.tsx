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
const showEdit = false;

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user") || "null");
  const handleLogOut = () => {
    sessionStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <Box
      marginLeft={{ base: "0", lg: "auto" }}
      display={"flex"}
      gap={2}
      alignItems={"center"}>
      <Menu>
        {user && <Text>{user}</Text>}
        <MenuButton
          disabled={!user}
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
              name={user}
            />
          }
        />
        <MenuList color={"black"}>
          {showEdit && <MenuItem>Edit Profile</MenuItem>}
          <MenuItem color={"red.400"} onClick={handleLogOut}>
            Log out
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
