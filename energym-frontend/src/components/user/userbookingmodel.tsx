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
  useToast,
  Button,
  TableCaption,
  Image,
} from "@chakra-ui/react";
import { SyntheticEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { bookingsapi } from "../../api/bookings";

export function Bookingclassmodel({
  class_id,
  classTitle,
  classType,
  classRoom,
  classStartDateTime,
  classEndDateTime,
  classDuration,
}: any) {
  //navigate user to another page
  const navigate = useNavigate();

  const toast = useToast();

  const authuser = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (authuser.token == "") {
      navigate("/login");
    }
  }, []);

  //function when users submit the form and add it into datebase
  const roombookingSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const data = {
      user_id: authuser.user?.id,
      class_id: class_id,
      classTitle: classTitle,
      classType: classType,
      classRoom: classRoom,
      classStartDateTime: classStartDateTime,
      classEndDateTime: classEndDateTime,
      classDuration: classDuration,
      userFullName: authuser.user?.name,
      userEmail: authuser.user?.email,
      userMobile: authuser.user?.mobile,
      userProfilePic: authuser.user?.profilePic,
    };

    console.log(data);
    bookingsapi.post(`api/bookings`, data).then((res) => {
      console.log(res.data);
      if (res.data.status === 200) {
        console.log(res.data);
        toast({
          title: res.data.message,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        navigate("/yourclassbookings", { replace: true });
      } else if (res.data.status === 409) {
        console.log(res.data);
        toast({
          title: res.data.message,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        navigate("/yourclassbookings", { replace: true });
      }
    });
  };

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
        Book {classTitle}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Class Booking Summary</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table variant="simple" colorScheme="blackAlpha">
                <Tr>
                  <Th>Full Name</Th>
                  <Td>{authuser.user?.name}</Td>
                </Tr>
                <Tr>
                  <Th>Email</Th>
                  <Td>{authuser.user?.email}</Td>
                </Tr>
                <Tr>
                  <Th>Mobile</Th>
                  <Td>{authuser.user?.mobile}</Td>
                </Tr>
                <Tr>
                  <Th>Profile Picture</Th>
                  <Td>
                    <Image
                      width={"100px"}
                      height={"100px"}
                      objectFit="cover"
                      borderRadius={"100%"}
                      src={authuser.user?.profilePic}
                    />
                  </Td>
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
                    {classStartDateTime} - {classEndDateTime}
                  </Td>
                </Tr>
                <Tr>
                  <Th>Class duration</Th>
                  <Td>{classDuration}</Td>
                </Tr>
                <TableCaption color={"red"}>
                  *Please check your personal particulars, edit on profile if
                  any changes
                </TableCaption>
              </Table>
            </TableContainer>
          </ModalBody>
          <ModalFooter>
            <Button
              bg={"#6bbbb4"}
              color={"#ffffff"}
              boxShadow={
                "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              }
              _hover={{
                bg: "blue.500",
              }}
              onClick={roombookingSubmit}
            >
              Confirm Booking
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
