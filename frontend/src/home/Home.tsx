import { ArrowDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Icon,
  Skeleton,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardQuote from "../components/CardQuote/CardQuote";
import CreateCardQuote from "../components/CreateCardQuote/CreateCardQuote";
import HeaderControlls from "../components/HeaderControlls/HeaderControlls";
import { useFiltersContext } from "../context/FiltersContext";
import { useUserContext } from "../context/UserContext";
import { useCards } from "../hooks/useCards";

const MotionBox = motion(Box);

export default function Home() {
  const { user, setUser } = useUserContext();
  const {
    filters: { search },
  } = useFiltersContext();
  const [isCreateCardOpen, setIsCreateCardOpen] = useState(false);
  const { data, isError, isLoading, isSuccess, refetch } = useCards(search);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) {
      navigate("/login");
    }
  }, [navigate]);

  if (isError) {
    setUser(null);
    navigate("/error");
  }

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
          refetchCards={refetch}
        />
        <MotionBox
          layout
          display={"flex"}
          width={"100%"}
          flex={1}
          gap={5}
          flexWrap={"wrap"}
          mt={5}>
          <AnimatePresence>
            {isSuccess &&
              data?.map((card, index) => (
                <motion.div
                  layout
                  key={card.id}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{
                    duration: 0.15,
                    delay: index * 0.15,
                    ease: "circInOut",
                  }}
                  style={{ flex: 1 }}>
                  <CardQuote info={card} refetchCards={refetch} />
                </motion.div>
              ))}
          </AnimatePresence>
        </MotionBox>
        {isLoading && (
          <MotionBox
            layout
            display={"flex"}
            width={"100%"}
            flex={1}
            gap={5}
            flexWrap={"wrap"}
            mt={5}>
            <AnimatePresence>
              {Array.from({ length: 3 }).map((_, index) => (
                <motion.div
                  layout
                  key={index}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{
                    duration: 0.15,
                    delay: index * 0.15,
                    ease: "easeInOut",
                  }}
                  style={{ flex: 1 }}>
                  <Flex
                    width={300}
                    flexDirection={"column"}
                    gap={5}
                    padding="6"
                    rounded={"lg"}
                    boxShadow="lg"
                    bg="white">
                    <Flex
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                      key={index}>
                      <SkeletonCircle size="10" />
                      <Flex flexDirection={"column"} gap={2}>
                        <Skeleton width={175} height={4} />
                        <Skeleton width={75} height={4} />
                      </Flex>
                    </Flex>
                    <Flex justifyContent={"space-between"}>
                      <Skeleton width={100} height={30} />
                      <Skeleton width={100} height={30} />
                    </Flex>
                  </Flex>
                </motion.div>
              ))}
            </AnimatePresence>
          </MotionBox>
        )}
        {data && data.length > 50 && (
          <AnimatePresence>
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
          </AnimatePresence>
        )}
      </MotionBox>
    </AnimatePresence>
  );
}
