import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Table,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { Info } from "phosphor-react";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import moment from "moment";

export function Classinfomodel({
  instructorName,
  classTitle,
  classType,
  classRoom,
  classStartDateTime,
  classEndDateTime,
  classDuration,
  price,
  slots,
}: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Info size={25} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{classTitle} Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table variant="simple" colorScheme="blackAlpha">
                <Tr>
                  <Th>Instructor</Th>
                  <Td>{instructorName}</Td>
                </Tr>
                <Tr>
                  <Th>Title</Th>
                  <Td>{classTitle}</Td>
                </Tr>
                <Tr>
                  <Th>Class Type</Th>
                  <Td>{classType}</Td>
                </Tr>
                <Tr>
                  <Th>Classroom</Th>
                  <Td>{classRoom}</Td>
                </Tr>
                <Tr>
                  <Th>Class timing</Th>
                  <Td>
                    {moment(classStartDateTime).format("YYYY-MM-DD h:mm A")} -{" "}
                    {moment(classEndDateTime).format("YYYY-MM-DD h:mm A")}
                  </Td>
                </Tr>
                <Tr>
                  <Th>Class duration</Th>
                  <Td>{classDuration}</Td>
                </Tr>
                <Tr>
                  <Th>Price</Th>
                  <Td>${price}</Td>
                </Tr>
                <Tr>
                  <Th>Slots</Th>
                  <Td>{slots}</Td>
                </Tr>
              </Table>
            </TableContainer>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export const NavLink = styled(Link)`
  text-decoration: none;
  border-radius: 6px;
  cursor: pointer;
  padding: 7px;
  &:hover {
    background-color: #a3c5c2;
  }
`;
