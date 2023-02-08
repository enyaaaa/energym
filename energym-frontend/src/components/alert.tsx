import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

export function Alert({ title, message, action, trigger }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        bg={"#bb6b6b"}
        color={"#ffffff"}
        boxShadow={
          "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
        }
        _hover={{
          bg: "blue.500",
        }}
        onClick={onOpen}
      >
        {action}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{message}</ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={trigger}>
              {action}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
