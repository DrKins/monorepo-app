import { Box, Button, Icon, Input, Link, Text } from "@chakra-ui/react";
import { useState } from "react";
import { BiSolidLogInCircle } from "react-icons/bi";
import { BsLockFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
export default function Login() {
  const [login, setLogin] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const mutation = useLogin();

  const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(event);
    event.preventDefault();
    mutation.mutate(login);
  };

  return (
    <Box
      display={"flex"}
      gap={2}
      flexDirection={"column"}
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
          onSubmit={onSubmit}
          as="form"
          display={"flex"}
          flexDirection={{ base: "column", lg: "row" }}
          gap={5}
          width={"100%"}>
          <Input
            name="username"
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
            type="submit"
            width={{ base: "100%", lg: "50%" }}
            color={"blue.500"}
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
