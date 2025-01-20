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
import { useUserContext } from "../../context/UserContext";
const showEdit = false;

export default function Profile() {
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();
  const handleLogOut = () => {
    setUser(null);
    navigate("/login");
  };

  if (!user?.email) {
    return null;
  }

  return (
    <Box
      marginLeft={{ base: "0", lg: "auto" }}
      display={"flex"}
      gap={2}
      alignItems={"center"}>
      <Menu>
        <Text>{user.email}</Text>
        <MenuButton
          disabled={!user.email}
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
              name={user.email}
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
