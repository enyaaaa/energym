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
  Avatar,
  AvatarGroup,
  Thead,
  Image,
} from "@chakra-ui/react";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { bookingsapi } from "../../api/bookings";
import { useEffect, useState } from "react";

export function Viewusersbookingmodel({ id }: any) {
  interface Students {
    userProfilePic: string;
    userFullName: string;
    userEmail: string;
    userMobile: number;
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  //using state
  const [classbookings, setClassbookings] = useState([]);

  useEffect(() => {
    bookingsapi.get(`api/classbookings/${id}`).then((res) => {
      if (res.data.status === 200) {
        setClassbookings(res.data.classes);
      }
    });
  }, []);

  return (
    <>
      <AvatarGroup size="md" max={2} onClick={onOpen}>
        {classbookings.map((User: Students) => {
          return <Avatar src={User.userProfilePic} key={id} />;
        })}
      </AvatarGroup>
      <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Number of students: {classbookings.length}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table variant="simple" colorScheme="blackAlpha">
                <Thead>
                  <Tr>
                    <Th>Profile Pic</Th>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Mobile</Th>
                  </Tr>
                </Thead>
                {classbookings.map((User: Students) => {
                  return (
                    <Tr key={id}>
                      <Td>
                        <Image
                          width={"70px"}
                          height={"70px"}
                          objectFit="cover"
                          borderRadius={"100%"}
                          src={User.userProfilePic}
                        />
                      </Td>
                      <Td>{User.userFullName}</Td>
                      <Td>{User.userEmail}</Td>
                      <Td>{User.userMobile}</Td>
                    </Tr>
                  );
                })}
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
