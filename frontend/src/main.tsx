import { Box, ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Router from "./router/Router";
import theme from "./theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <Box
        p={6}
        minHeight={"100vh"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}>
        <RouterProvider router={Router} />
      </Box>
    </ChakraProvider>
  </StrictMode>,
);
