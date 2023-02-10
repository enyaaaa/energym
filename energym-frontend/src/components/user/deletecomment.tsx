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
import { TrashSimple } from "phosphor-react";

export function Deletealert({ title, message, action, trigger }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <TrashSimple size={25} color="#75ccbb" onClick={onOpen} />
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
