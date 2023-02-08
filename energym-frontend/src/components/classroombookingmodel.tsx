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
  useToast,
  Image,
  Textarea,
} from "@chakra-ui/react";
import { SyntheticEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { classesapiToken } from "../api/classes";
import { RootState } from "../store";
import styled from "styled-components";

export function Bookingclassmodel({ classroom, classType, classImage }: any) {
  //navigate user to another page
  const navigate = useNavigate();

  const toast = useToast();

  const [img, setImg] = useState<any>();
  const [view, setView] = useState<any>();

  function onImageChange(e: any) {
    console.log(e.target.files);
    setImg(e.target.files[0]);
  }

  useEffect(() => {
    if (img) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setView(reader.result);
      };
      reader.readAsDataURL(img);
    } else {
      setView("");
    }
  }, [img]);

  const authinstructor = useSelector((state: RootState) => state.instructor);

  const [roombookingInput, setRoombookingInput] = useState<any>({
    instructor_id: authinstructor.instructor?.id,
    instructorName: authinstructor.instructor?.name,
    classTitle: "",
    classType: classType,
    classRoom: classroom,
    classStartDateTime: "",
    classEndDateTime: "",
    classDuration: "",
    price: "",
    purpose: "",
    description: "",
    slots: "",
    error_list: [],
  });

  //handing users input
  const handleInput = (e: any) => {
    e.persist();
    setRoombookingInput({
      ...roombookingInput,
      [e.target.name]: e.target.value,
    });
  };

  //function when users submit the form and add it into datebase
  const roombookingSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const data = {
      instructor_id: authinstructor.instructor?.id,
      instructorName: authinstructor.instructor?.name,
      classTitle: roombookingInput.classTitle,
      classImage: img,
      classType: classType,
      classRoom: classroom,
      classStartDateTime: roombookingInput.classStartDateTime,
      classEndDateTime: roombookingInput.classEndDateTime,
      classDuration: roombookingInput.classDuration,
      price: "45",
      purpose: roombookingInput.purpose,
      description: roombookingInput.description,
      slots: roombookingInput.slots,
      error_list: [],
    };

    console.log(data);
    classesapiToken(authinstructor.token)
      .post(`api/classes`, data)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 200) {
          console.log(res.data);
          toast({
            title: res.data.message,
            status: "success",
            duration: 4000,
            isClosable: true,
          });
          navigate("/yourstudiobookings", { replace: true });
        }else if (res.data.status === 409) {
          toast({
            title: res.data.message,
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        } else {
          setRoombookingInput({
            ...roombookingInput,
            error_list: res.data.validation_errors,
          });
          toast({
            title: res.data.message,
            status: "error",
            duration: 4000,
            isClosable: true,
          });
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
                  <Input
                    type="text"
                    name="classTitle"
                    placeholder="Class Title"
                    onChange={handleInput}
                    value={roombookingInput.classTitle}
                  />
                  <Validation>{roombookingInput.error_list.classTitle}</Validation>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Start Date and Time</FormLabel>
                  <Input
                    type="datetime-local"
                    name="classStartDateTime"
                    onChange={handleInput}
                    value={roombookingInput.classStartDateTime}
                  />
                  <Validation>{roombookingInput.error_list.classStartDateTime}</Validation>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>End Date and Time</FormLabel>
                  <Input
                    type="datetime-local"
                    name="classEndDateTime"
                    onChange={handleInput}
                    value={roombookingInput.classEndDateTime}
                  />
                  <Validation>{roombookingInput.error_list.classEndDateTime}</Validation>
                </FormControl>
                <FormControl mt={4}>
                  <Image
                    width={"150px"}
                    height={"150px"}
                    objectFit="cover"
                    borderRadius={"100%"}
                    src={view}
                  />
                  <Input
                    type="file"
                    name="profilePic"
                    padding={"5px"}
                    accept="image/*"
                    onChange={onImageChange}
                  />
                  <Validation>{roombookingInput.error_list.profilePic}</Validation>
                </FormControl>
              </ModalBody>
              <ModalBody>
                <FormControl>
                  <FormLabel>Class Type</FormLabel>
                  <Input
                    type="text"
                    name="classType"
                    onChange={handleInput}
                    value={classType}
                  />
                  <Validation>{roombookingInput.error_list.classType}</Validation>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Class Duration</FormLabel>
                  <Select
                    name="classDuration"
                    margin="8px 0"
                    value={roombookingInput.classDuration}
                    onChange={handleInput}
                  >
                    <option value="--">---</option>
                    <option value="3 hour">3 hour</option>
                    <option value="2 hour">2 hour</option>
                    <option value="1 hour">1 hour</option>
                    <option value="45 min">45 min</option>
                  </Select>
                  <Validation>{roombookingInput.error_list.classDuration}</Validation>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Purpose</FormLabel>
                  <Input
                    type="text"
                    name="purpose"
                    placeholder="Purpose of use"
                    onChange={handleInput}
                    value={roombookingInput.purpose}
                  />
                  <Validation>{roombookingInput.error_list.purpose}</Validation>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    name="description"
                    placeholder="Description"
                    onChange={handleInput}
                    value={roombookingInput.description}
                  />
                  <Validation>{roombookingInput.error_list.description}</Validation>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Slots</FormLabel>
                  <Select
                    name="slots"
                    margin="8px 0"
                    value={roombookingInput.slots}
                    onChange={handleInput}
                  >
                    <option value="--">---</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                  </Select>
                  <Validation>{roombookingInput.error_list.slots}</Validation>
                </FormControl>
              </ModalBody>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={roombookingSubmit}>
              Confirm Booking
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const Validation = styled.span`
  font-size: 12px;
  color: #6bbbb4;
`;
