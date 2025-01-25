import { Flex } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { useLocation, useOutlet } from "react-router-dom";
import Logo from "../components/Logo/Logo";
import Profile from "../components/Profile/Profile";
import AnimatedLayout from "./AnimatedLayout";

const AnimatedOutlet = (): React.JSX.Element => {
  const location = useLocation();
  const element = useOutlet();

  return (
    <div key={location.pathname}>
      {["/login", "/register", "/error"].includes(location.pathname) ||
      !location.pathname ? (
        <Flex
          minHeight={"calc(100vh - 6px)"}
          p={6}
          justifyContent={"center"}
          flexDir={"column"}>
          <AnimatePresence mode="wait" initial={true}>
            <Flex justifyContent={"space-between"} mb={5}>
              <AnimatePresence mode="wait" initial={true}>
                <AnimatedLayout variant="slide-right">
                  <Logo />
                </AnimatedLayout>
              </AnimatePresence>
            </Flex>
            {element && React.cloneElement(element, { key: location.pathname })}
          </AnimatePresence>
        </Flex>
      ) : (
        <Flex
          maxWidth={1200}
          minHeight={"calc(100vh - 6px)"}
          p={6}
          justifyContent={"start"}
          flexDir={"column"}>
          <AnimatePresence mode="wait">
            <Flex justifyContent={"space-between"} mb={5}>
              <AnimatedLayout variant="slide-right">
                <Logo />
              </AnimatedLayout>
              <AnimatedLayout variant="slide-right">
                <Profile />
              </AnimatedLayout>
            </Flex>
            {element && React.cloneElement(element, { key: location.pathname })}
          </AnimatePresence>
        </Flex>
      )}
    </div>
  );
};

export default AnimatedOutlet;
