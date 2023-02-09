import {
  Box,
  Heading,
  Container,
  Text,
  Stack,
  Flex,
  Image,
} from "@chakra-ui/react";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";

const joinourteam = () => {
  return (
    <Container maxW={"7xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "5xl", sm: "6xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "teal.400",
                zIndex: -1,
              }}
            >
              Energym,
            </Text>
            <br />
            <Text as={"span"} color={"teal.400"}>
              Join the team 🤗
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Energym allow members to browse fitness video, classes, routines at
            their finger tips. Provides services like online booking for
            classes, watch videos of workouts, challengers and routines that
            users can follow at home, recommend recipes that users can do at
            home and forum for users to share their experience and reviews.
          </Text>
          <NavLink to="/instructorlogin">🚀 GET STARTED</NavLink>
        </Stack>
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Box
            position={"relative"}
            height={"350px"}
            rounded={"2xl"}
            boxShadow={"2xl"}
            width={"full"}
            overflow={"hidden"}
          >
            <Image
              alt={"Hero Image"}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={"100%"}
              src={
                "https://media.istockphoto.com/id/1132086660/photo/side-view-of-beautiful-muscular-woman-running-on-treadmill.jpg?s=612x612&w=0&k=20&c=5Vq_BJjG7sbIyKIP-Adu0pChReDXm0dC7BVPvto2M0I="
              }
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
};

export const NavLink = styled(Link)`
  width: 150px;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  background-color: #a1cac6c0;
  padding: 15px;
  border-radius: 30px;
  &:hover {
    background-color: #95c2be;
  }
`;

export default joinourteam;
