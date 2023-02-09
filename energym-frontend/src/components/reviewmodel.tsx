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
  useToast,
  Image,
} from "@chakra-ui/react";
import { SyntheticEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import styled from "styled-components";
import { forumapi } from "../api/forum";

export function Reviewmodel() {
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

  const authuser = useSelector((state: RootState) => state.user);

  const [reviewInput, setReviewInput] = useState<any>({
    user_id: authuser.user?.id,
    review: "",
    rating: "",
    error_list: [],
  });

  //handing users input
  const handleInput = (e: any) => {
    e.persist();
    setReviewInput({
      ...reviewInput,
      [e.target.name]: e.target.value,
    });
  };

  //function when users submit the form and add it into datebase
  const reviewSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const data = {
      user_id: authuser.user?.id,
      name: authuser.user?.name,
      review: reviewInput.review,
      commentImage: img,
      rating: reviewInput.rating,
    };

    console.log(data);
    forumapi
      .post(`api/forum`, data)
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
        } else {
            setReviewInput({
            ...reviewInput,
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
        LEAVE A REVIEW
      </Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Leave a Review</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ModalBody>
              <FormControl>
                <FormLabel>Review</FormLabel>
                <Input
                  type="text"
                  name="review"
                  placeholder="Comment"
                  onChange={handleInput}
                  value={reviewInput.review}
                />
                <Validation>{reviewInput.error_list.review}</Validation>
              </FormControl>
              <FormControl>
                <FormLabel>Review</FormLabel>
                <Input
                  type="text"
                  name="rating"
                  placeholder="Rating"
                  onChange={handleInput}
                  value={reviewInput.rating}
                />
                <Validation>{reviewInput.error_list.rating}</Validation>
              </FormControl>
              {/* <FormControl mt={4}>
                <FormLabel>Rating</FormLabel>
                <Select
                  name="rating"
                  margin="8px 0"
                  value={reviewInput.rating}
                  onChange={handleInput}
                >
                  <option value="--">---</option>
                  <option value="1">💪</option>
                  <option value="2">💪💪</option>
                  <option value="3">💪💪💪</option>
                  <option value="4">💪💪💪💪</option>
                  <option value="5">💪💪💪💪💪</option>
                </Select>
                <Validation>{reviewInput.error_list.rating}</Validation>
              </FormControl> */}
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
              </FormControl>
            </ModalBody>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={reviewSubmit}>
              Post the review
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
