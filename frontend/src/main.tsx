import { Box, ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Router from "./router/Router";
import theme from "./theme";

const queryClient = new QueryClient();
if (localStorage.getItem("token")) localStorage.removeItem("token");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ChakraProvider theme={theme}>
          <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
            <RouterProvider router={Router} />
          </Box>
        </ChakraProvider>
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>,
);
