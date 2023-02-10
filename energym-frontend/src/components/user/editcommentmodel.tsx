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
} from "@chakra-ui/react";
import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { forumapi } from "../../api/forum";
import { Pen } from "phosphor-react";
import { Alert } from "../alert";

export function Editcommentmodel({ id, review, rating }: any) {
  //navigate user to another page
  const navigate = useNavigate();

  const toast = useToast();

  const [formData, setFormData] = useState<any>({
    review: review,
    rating: rating,
    error_list: [],
  });

  //handing users input
  const handleInput = (e: any) => {
    e.persist();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //function when users submit the form and add it into datebase
  const updateCommentSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("review", formData.review);
    data.append("rating", formData.rating);

    console.log(data);

    forumapi.post(`api/updatecomment/${id}`, data).then((res) => {
      console.log(res.data);
      if (res.data.status === 200) {
        console.log(res.data);
        toast({
          title: res.data.message,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        navigate("/forum", { replace: true });
      } else {
        setFormData({
          ...formData,
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
      <Pen size={25} color="#75ccbb" onClick={onOpen} />
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <ModalBody>
                <form
                  onSubmit={updateCommentSubmit}
                  encType="multipart/form-data"
                >
                  <FormControl>
                    <FormLabel>Review</FormLabel>
                    <Input
                      type="text"
                      name="review"
                      id="review"
                      placeholder="review"
                      defaultValue={review}
                      onChange={handleInput}
                    />
                    <Validation>{formData.error_list.review}</Validation>
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Rating</FormLabel>
                    <Select
                      margin="8px 0"
                      name="rating"
                      id="rating"
                      defaultValue={rating}
                      onChange={handleInput}
                    >
                      <option value="--">---</option>
                      <option value="1">🏆</option>
                      <option value="2">🏆🏆</option>
                      <option value="3">🏆🏆🏆</option>
                      <option value="4">🏆🏆🏆🏆</option>
                      <option value="5">🏆🏆🏆🏆🏆</option>
                    </Select>
                    <Validation>{formData.error_list.rating}</Validation>
                  </FormControl>
                </form>
              </ModalBody>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Alert
              action="Update Review"
              title="Are you sure you want to update the review?"
              trigger={updateCommentSubmit}
            />
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
