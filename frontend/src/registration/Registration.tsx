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
import { GrUserNew } from "react-icons/gr";
import { IoEnter } from "react-icons/io5";
import { MdError } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useRegistration } from "../hooks/useRegister";
import { updateInputColorOnError } from "../utils/updateColorOnError";
export default function Registration() {
  const { mutate, isError, error } = useRegistration();
  const [registrationForm, setRegistrationForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationForm({
      ...registrationForm,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(registrationForm);
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
        <Box>
          <Text color={"white"} fontSize={"3xl"} fontWeight={"light"}>
            <Icon
              alignSelf={isError ? "start" : "center"}
              color={"blue.200"}
              as={GrUserNew}
              boxSize={"30px"}
              mt={8}
              mr={2}
            />
            Registration form
          </Text>
          <Box
            onSubmit={onSubmit}
            as="form"
            display={"flex"}
            flexDirection={{ base: "column", lg: "row" }}
            gap={5}
            width={"100%"}>
            <FormControl>
              <FormLabel color={"white"}>Email Adress</FormLabel>
              <Input
                name="email"
                color={"white"}
                type="email"
                width={"100%"}
                isInvalid={updateInputColorOnError({
                  type: "Email",
                  error,
                })}
                errorBorderColor="red.300"
                onChange={handleStateChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel color={"white"}>Password</FormLabel>
              <Input
                name="password"
                type="text"
                width={"100%"}
                isInvalid={updateInputColorOnError({
                  type: "Password",
                  error,
                })}
                errorBorderColor="red.300"
                onChange={handleStateChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel color={"white"}>Confirm Password</FormLabel>
              <Input
                name="confirmPassword"
                type="text"
                width={"100%"}
                isInvalid={updateInputColorOnError({
                  type: "Password",
                  error,
                })}
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
                <Icon color={"blue.500"} as={IoEnter} boxSize={"35px"} />
              }>
              Register
            </Button>
          </Box>
          <Box>
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
      </Box>
      <Text alignSelf={"flex-start"}>
        Already have an account?&nbsp;
        <Link color={"blue.300"} onClick={() => navigate("/login")}>
          Log in
        </Link>
      </Text>
    </Box>
  );
}
