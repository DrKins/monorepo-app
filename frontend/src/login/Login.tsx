import { Box, Button, Icon, Input, Link, Text } from "@chakra-ui/react";
import { useState } from "react";
import { BiSolidLogInCircle } from "react-icons/bi";
import { BsLockFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [login, setLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };

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
        <Text
          display={{ base: "none", lg: "block" }}
          textAlign={"center"}
          color={"white"}
          fontSize={"3xl"}
          fontWeight={"semibold"}
          width={"40%"}>
          Login page
        </Text>
        <Icon color={"blue.200"} as={BsLockFill} boxSize={"25px"} />
        <Box
          as="form"
          display={"flex"}
          flexDirection={{ base: "column", lg: "row" }}
          gap={5}
          width={"100%"}>
          <Input
            name="email"
            color={"white"}
            placeholder="Email"
            type="email"
            width={"100%"}
            onChange={handleStateChange}
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            width={"100%"}
            onChange={handleStateChange}
          />
          <Button
            width={{ base: "100%", lg: "50%" }}
            color={"blue.500"}
            onClick={() => navigate("/home")}
            rightIcon={
              <Icon
                color={"blue.500"}
                as={BiSolidLogInCircle}
                boxSize={"35px"}
              />
            }>
            Login
          </Button>
        </Box>
      </Box>
      <Text alignSelf={"flex-start"}>
        Don't have an account?{" "}
        <Link color={"blue.300"} onClick={() => navigate("/register")}>
          Sign up
        </Link>
      </Text>
    </Box>
  );
}
