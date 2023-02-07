import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
} from "@chakra-ui/react";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";

const joinourteam = () => {
  return (
    <Container maxW={"3xl"}>
      <Stack
        as={Box}
        textAlign={"center"}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}
      >
        <Heading
          fontWeight={700}
          fontSize={{ base: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          JOIN THE TEAM <br />
          <Text as={"span"} color={"blue.400"}>
           @ENERGYM
          </Text>
        </Heading>
        <Text color={"gray.500"}>
        Energym allow members to browse fitness video, classes, routines at
          their finger tips. Provides services like online booking for classes,
          watch videos of workouts, challengers and routines that users can
          follow at home, recommend recipes that users can do at home and forum
          for users to share their experience and reviews.
        </Text>
        <Stack
          direction={"column"}
          spacing={3}
          align={"center"}
          alignSelf={"center"}
          position={"relative"}
        >
          <NavLink to="/instructorlogin">GET STARTED</NavLink>
        </Stack>
      </Stack>
    </Container>
  );
};

export const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  cursor: pointer;
  background-color: #747474;
  padding: 10px;
  border-radius: 30px;
  &:hover {
    background-color: #599b95;
  }
`;


export default joinourteam;
