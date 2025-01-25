import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Icon,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { useUserContext } from "../../context/UserContext";
import { useCreateCard } from "../../hooks/useCreateCard";

const MotionCard = motion(Card);
const MotionCardFooter = motion(CardFooter);

type CreateCardQuoteProps = {
  isCreateCardOpen: boolean;
  setIsCreateCardOpen: Dispatch<SetStateAction<boolean>>;
  refetchCards: () => void;
};

export default function CreateCardQuote({
  isCreateCardOpen,
  setIsCreateCardOpen,
  refetchCards,
}: CreateCardQuoteProps) {
  const { user } = useUserContext();
  const { mutate, isPending, isSuccess } = useCreateCard();
  const [createCardForm, setCreateCardForm] = useState({
    content: "",
  });
  function handleClose() {
    setIsCreateCardOpen(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setCreateCardForm({ ...createCardForm, content: e.target.value });
  }
  function handleCreateCard() {
    if (createCardForm.content.length > 255) return;
    mutate(createCardForm, {
      onSuccess: () => {
        refetchCards();
      },
    });
    setIsCreateCardOpen(false);
  }

  useEffect(() => {
    isSuccess && setIsCreateCardOpen(false);
  }, [isSuccess]);

  return (
    <AnimatePresence>
      {isCreateCardOpen && (
        <MotionCard
          layout
          initial={{ x: -100, opacity: 0, height: 0 }}
          animate={{ x: 0, opacity: 1, height: "auto" }}
          exit={{ x: 100, height: 0, width: 0, opacity: 0 }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
          maxWidth={"450px"}
          mb={5}>
          <CardBody display={"flex"} gap={5}>
            <Avatar name={user?.email ?? ""} size={"sm"} />

            <Flex flexDirection={"column"} gap={2} width={"100%"}>
              <Textarea
                placeholder="What's on your mind?"
                minHeight={100}
                name="content"
                onChange={handleChange}
                maxLength={255}
                isInvalid={createCardForm.content.length > 255}
                errorBorderColor="red.300"
              />
              {
                <Text color={"gray.400"}>
                  {createCardForm.content.length}/255
                </Text>
              }
            </Flex>
          </CardBody>
          <MotionCardFooter
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            display={"flex"}
            gap={5}
            justifyContent={"flex-end"}>
            <Button gap={2} isLoading={isPending} onClick={handleCreateCard}>
              <Icon as={FaSave} color={"green.500"} />
              Publish
            </Button>
            <Button gap={2} onClick={handleClose}>
              <Icon as={IoMdCloseCircle} color={"red.500"} />
              Close
            </Button>
          </MotionCardFooter>
        </MotionCard>
      )}
    </AnimatePresence>
  );
}
