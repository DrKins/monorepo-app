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

  // TODO: move to different component; version without profile
  if (["/login", "/register"].includes(location.pathname) || !location.pathname)
    return (
      <AnimatePresence mode="wait" initial={true}>
        <Flex justifyContent={"space-between"} mb={5}>
          <AnimatePresence mode="wait" initial={true}>
            <AnimatedLayout variant="slide-left">
              <Logo />
            </AnimatedLayout>
          </AnimatePresence>
        </Flex>
        {element && React.cloneElement(element, { key: location.pathname })}
      </AnimatePresence>
    );

  return (
    <AnimatePresence mode="wait">
      <Flex justifyContent={"space-between"} mb={5}>
        <AnimatedLayout variant="slide-left">
          <Logo />
        </AnimatedLayout>
        <AnimatedLayout variant="slide-right">
          <Profile />
        </AnimatedLayout>
      </Flex>
      {element && React.cloneElement(element, { key: location.pathname })}
    </AnimatePresence>
  );
};

export default AnimatedOutlet;
