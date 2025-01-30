import { Box, Button, Icon, Text } from "@chakra-ui/react";
import { GiLockedChest } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/login");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="center"
      textAlign="center">
      <Text fontSize="2xl" mt={4}>
        <Icon as={GiLockedChest} boxSize={12} color="blue.200" mr={4} />
        Unauthorized Access.
      </Text>
      <Text fontSize="lg" mt={2}>
        You do not have the necessary permissions to view this page.
      </Text>
      <Button mt={6} colorScheme="blue" onClick={handleGoBack}>
        Login now
      </Button>
    </Box>
  );
}
