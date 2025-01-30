import { Box, Icon, Text } from "@chakra-ui/react";
import { BsFlower3 } from "react-icons/bs";

const Logo = () => {
  return (
    <Box display={"flex"} gap={2} alignItems={"center"}>
      <Icon as={BsFlower3} boxSize={"35px"} />
      <Text fontSize={"3xl"} fontWeight={"semibold"}>
        Monorepo App
      </Text>
    </Box>
  );
};

export default Logo;
