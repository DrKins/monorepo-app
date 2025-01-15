import { Box, ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Router from "./router/Router";
import theme from "./theme";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Box
          p={6}
          minHeight={"100vh"}
          display={"flex"}
          justifyContent={"start"}
          alignItems={"center"}
          flexDirection={"column"}>
          <RouterProvider router={Router} />
        </Box>
      </ChakraProvider>
    </QueryClientProvider>
  </StrictMode>,
);
