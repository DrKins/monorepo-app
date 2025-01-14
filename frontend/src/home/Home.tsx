import { Box } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import CardQuote from "../components/CardQuote/CardQuote";
import CreateCardQuote from "../components/CreateCardQuote/CreateCardQuote";
import HeaderControlls from "../components/HeaderControlls/HeaderControlls";

const MotionBox = motion(Box);

export default function Home() {
  const [isCreateCardOpen, setIsCreateCardOpen] = useState(false);
  const [cards, _setCards] = useState(new Array(10).fill(""));

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  fetch(`${backendUrl}/api/cards`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error fetching data from backend:", error);
    });

  return (
    <AnimatePresence>
      <MotionBox layout display={"flex"} flexDirection={"column"}>
        <HeaderControlls
          handleOpen={setIsCreateCardOpen}
          isOpen={isCreateCardOpen}
        />
        <CreateCardQuote
          isCreateCardOpen={isCreateCardOpen}
          setIsCreateCardOpen={setIsCreateCardOpen}
        />
        <MotionBox layout display={"flex"} gap={5} flexWrap={"wrap"} mt={5}>
          <AnimatePresence>
            {cards.map((_card, index) => (
              <motion.div
                layout
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.15,
                  delay: index * 0.15,
                  ease: "easeInOut",
                }}>
                <CardQuote />
              </motion.div>
            ))}
          </AnimatePresence>
        </MotionBox>
        {/* <AnimatePresence>
          <MotionBox
            layout
            initial={{ opacity: 0, x: "20vw" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "20vw" }}
            transition={{ duration: 0.7, ease: "easeInOut", delay: 0.45 }}
            position={"fixed"}
            top={"50%"}
            right={"5%"}
            gap={5}
            display={"flex"}
            flexDir={"column"}>
            <Text
              fontSize={"2xl"}
              style={{ writingMode: "vertical-rl" }}
              transform={"rotate(180deg)"}
              fontWeight={"bold"}
              letterSpacing={"widest"}>
              Scroll to load more ...
            </Text>
            <Icon as={ArrowDownIcon} boxSize={"40px"} />
          </MotionBox>
        </AnimatePresence> */}
      </MotionBox>
    </AnimatePresence>
  );
}
