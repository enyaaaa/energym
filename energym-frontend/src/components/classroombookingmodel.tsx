import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Select,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";

export function Bookingclassmodel({ classroom }: any) {

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        bg={"#6bbbb4"}
        color={"#ffffff"}
        boxShadow={
          "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
        }
        _hover={{
          bg: "blue.500",
        }}
        onClick={onOpen}
      >
        {classroom}
      </Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size={"6xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{classroom}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <ModalBody>
                <FormControl>
                  <FormLabel>Class Title</FormLabel>
                  <Input placeholder="class title" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Class Type</FormLabel>
                  <Select name="category" id="category" margin="8px 0">
                    <option value="--">---</option>
                    <option value="yoga">yoga</option>
                    <option value="spin">spin</option>
                    <option value="pilates">pilates</option>
                    <option value="hiit">hiit</option>
                  </Select>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Start Date and Time</FormLabel>
                  <Input placeholder="start datetime" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>End Date and Time</FormLabel>
                  <Input placeholder="end datetime" />
                </FormControl>
              </ModalBody>
              <ModalBody>
                <FormControl>
                  <FormLabel>Duration</FormLabel>
                  <Select name="category" id="category" margin="8px 0">
                    <option value="--">---</option>
                    <option value="3 hour">3 hour</option>
                    <option value="2 hour">2 hour</option>
                    <option value="1 hour">1 hour</option>
                    <option value="45 min">45 min</option>
                  </Select>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Purpose</FormLabel>
                  <Input placeholder="purpose of use" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Description</FormLabel>
                  <Input placeholder="description" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Slots</FormLabel>
                  <Select name="category" id="category" margin="8px 0">
                    <option value="--">---</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                  </Select>
                </FormControl>
              </ModalBody>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue">Confirm Booking</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
