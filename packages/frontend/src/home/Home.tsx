import {
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardQuote from "../components/CardQuote/CardQuote";
import CreateCardQuote from "../components/CreateCardQuote/CreateCardQuote";
import HeaderControlls from "../components/HeaderControlls/HeaderControlls";
import { QUERY_KEYS } from "../constants/queryKeys";
import { useFiltersContext } from "../context/FiltersContext";
import { useUserContext } from "../context/UserContext";
import { useCards } from "../hooks/useCards";

const MotionBox = motion(Box);

export default function Home() {
  const scrollPaginationTrigger = useRef(null);
  const isInView = useInView(scrollPaginationTrigger);
  const { setUser } = useUserContext();
  const { filters } = useFiltersContext();
  const [isCreateCardOpen, setIsCreateCardOpen] = useState(false);
  const {
    data,
    isError,
    isLoading,
    isSuccess,
    isFetchingNextPage,
    refetch,
    fetchNextPage,
  } = useCards(filters);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const session = sessionStorage.getItem("token");
    if (!session) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    // Reset the query cache when filters change
    if (filters.sort) {
      queryClient.resetQueries({ queryKey: [QUERY_KEYS.CARDS, filters.sort] });
      refetch(); // Refetch the data with the updated filter
    }
  }, [filters, queryClient, refetch]); // Only trigger effect when filters change

  if (isError) {
    setUser(null);
    navigate("/error");
  }

  useEffect(() => {
    if (isInView) {
      fetchNextPage();
    }
  }, [isInView]);

  return (
    <AnimatePresence>
      <Flex flexDirection={"column"}>
        <HeaderControlls
          handleOpen={setIsCreateCardOpen}
          isOpen={isCreateCardOpen}
        />
        <MotionBox layout>
          <CreateCardQuote
            isCreateCardOpen={isCreateCardOpen}
            setIsCreateCardOpen={setIsCreateCardOpen}
            refetchCards={refetch}
          />
        </MotionBox>
        <MotionBox
          layout
          display={"flex"}
          width={"100%"}
          gap={5}
          flexWrap={"wrap"}
          key={filters.sort}>
          <AnimatePresence>
            {isSuccess &&
              data.pages.map((page) =>
                page.data.map((card) => (
                  <motion.div
                    layout
                    key={card.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.1,
                      type: "tween",
                    }}>
                    <CardQuote info={card} refetchCards={refetch} />
                  </motion.div>
                )),
              )}
          </AnimatePresence>
        </MotionBox>
        {isLoading && (
          <MotionBox
            layout
            display={"flex"}
            width={"100%"}
            gap={5}
            flexWrap={"wrap"}>
            <AnimatePresence>
              {Array.from({ length: 3 }).map((_, index) => (
                <motion.div
                  layout
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.1,
                    type: "tween",
                  }}>
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
        <div ref={scrollPaginationTrigger}></div>
        {isFetchingNextPage && (
          <Flex align={"center"} justifyContent={"center"} gap={5} my={10}>
            <Text size={"xl"} fontWeight={"semibold"}>
              Loading content
            </Text>
            <Spinner size={"md"} color="green" />
          </Flex>
        )}
      </Flex>
    </AnimatePresence>
  );
}
