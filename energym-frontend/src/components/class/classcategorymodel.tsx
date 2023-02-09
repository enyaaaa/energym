import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Img,
} from "@chakra-ui/react";
import { Info } from "phosphor-react";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";

export function Classcategorymodel({ header, desc, img, link }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Info size={25} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <Img
            src={img}
            alt={header}
            roundedTop={"sm"}
            objectFit="cover"
            h="full"
            w="full"
            paddingLeft={"20px"}
            paddingRight={"20px"}
          />
          <ModalBody>{desc}</ModalBody>
          <ModalFooter>
            <NavLink to={link}>EXPLORE {header} CLASSES</NavLink>
          </ModalFooter>
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
