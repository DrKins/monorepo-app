import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiSolidLogInCircle } from "react-icons/bi";
import { BsLockFill } from "react-icons/bs";
import { MdError } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
export default function Login() {
  const [login, setLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { mutate, isError, error } = useLogin();

  const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(login);
  };

  const updateInputColorOnError = (type: "Email" | "Password") => {
    const emailErrors = error?.errors?.filter((e) => e.message.includes(type));
    return !!emailErrors?.length;
  };

  return (
    <Box
      display={"flex"}
      gap={2}
      flexDirection={"column"}
      justifyContent={"center"}
      height={"100%"}
      width={"100%"}
      transition={"all ease-in-out 100ms"}>
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
          mt={isError ? 6 : 2}
          display={{ base: "none", lg: "block" }}
          textAlign={isError ? "start" : "center"}
          color={"white"}
          fontSize={"3xl"}
          fontWeight={"semibold"}
          alignSelf={"start"}
          width={"40%"}>
          Login page
          <Icon
            ml={4}
            alignSelf={isError ? "start" : "center"}
            color={"blue.200"}
            as={BsLockFill}
            boxSize={"25px"}
          />
        </Text>
        <Box>
          <Box
            onSubmit={onSubmit}
            as="form"
            display={"flex"}
            flexDirection={{ base: "column", lg: "row" }}
            alignItems={"center"}
            gap={5}
            width={"100%"}>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input
                name="email"
                color={"white"}
                type="email"
                width={"100%"}
                isInvalid={updateInputColorOnError("Email")}
                errorBorderColor="red.300"
                onChange={handleStateChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                width={"100%"}
                isInvalid={updateInputColorOnError("Password")}
                errorBorderColor="red.300"
                onChange={handleStateChange}
              />
            </FormControl>
            <Button
              alignSelf={isError ? "start" : "center"}
              mt={8}
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
          {isError && (
            <Box mt={4} color={"red.100"}>
              Something went wrong:
              {error?.errors?.map((error) => (
                <Box display={"flex"} gap={2}>
                  <Icon color={"red.200"} as={MdError} boxSize={"25px"} />
                  <Text color={"red.200"}>{error.message}</Text>
                </Box>
              ))}
            </Box>
          )}
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
