import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiSolidLogInCircle } from "react-icons/bi";
import { BsLockFill } from "react-icons/bs";
import { MdError } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
export default function Login() {
  const [login, setLogin] = useState({ username: "", password: "" });
  const [hasErrors, setHasErrors] = useState(false);
  const navigate = useNavigate();
  const { mutate, isError, error } = useLogin();

  useEffect(() => {
    console.log(error);
    setHasErrors(isError);
  }, [isError]);

  const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasErrors(false);
    setLogin({ ...login, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(event);
    event.preventDefault();
    mutate(login);
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
        <Icon
          color={hasErrors ? "red.200" : "blue.200"}
          as={BsLockFill}
          boxSize={"25px"}
        />
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
                name="username"
                color={"white"}
                type="email"
                width={"100%"}
                isInvalid={hasErrors}
                errorBorderColor="red.300"
                onChange={handleStateChange}
              />
              <FormHelperText color={"whiteAlpha.700"}>
                Please enter your email.
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                width={"100%"}
                isInvalid={hasErrors}
                errorBorderColor="red.300"
                onChange={handleStateChange}
              />
              <FormHelperText color={"whiteAlpha.700"}>
                Please enter your password.
              </FormHelperText>
            </FormControl>
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
          {hasErrors && (
            <Box display={"flex"} gap={2}>
              <Icon color={"red.200"} as={MdError} boxSize={"25px"} />
              <Text color={"red.200"}>{error?.message}</Text>
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
