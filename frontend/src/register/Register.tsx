import { Box, Button, Icon, Input, Link, Text } from "@chakra-ui/react";
import { GiArchiveRegister } from "react-icons/gi";
import { IoEnter } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const navigate = useNavigate();

  return (
    <Box
      display={"flex"}
      gap={2}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"100%"}
      width={"100%"}>
      <Box
        border={"2px"}
        borderColor={"blue.300"}
        display={"flex"}
        flexDirection={{ base: "column", lg: "row" }}
        alignItems={"center"}
        justifyContent={"center"}
        gap={5}
        bgColor={"gray.900"}
        paddingInline={12}
        paddingBlock={6}
        borderRadius={"md"}>
        <Icon color={"blue.200"} as={GiArchiveRegister} boxSize={"25px"} />
        <Box
          as="form"
          display={"flex"}
          flexDirection={{ base: "column", lg: "row" }}
          gap={5}
          width={"100%"}>
          <Input
            name="usernam"
            color={"white"}
            placeholder="Username"
            width={"100%"}
          />
          <Input
            name="email"
            color={"white"}
            placeholder="Email"
            type="email"
            width={"100%"}
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            width={"100%"}
          />
          <Button
            width={{ base: "100%", lg: "50%" }}
            color={"blue.500"}
            onClick={() => navigate("/login")}
            rightIcon={
              <Icon color={"blue.500"} as={IoEnter} boxSize={"35px"} />
            }>
            Register
          </Button>
        </Box>
      </Box>
      <Text alignSelf={"flex-start"}>
        Already have an account?{" "}
        <Link color={"blue.300"} onClick={() => navigate("/login")}>
          Log in
        </Link>
      </Text>
    </Box>
  );
}
