import { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../utils/responsive";
import { Image, Box, Center, Badge } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { classesapi } from "../api/classes";
import { Instructor } from "../utils/types";

const team = () => {
  //using state
  const [instructors, setInstructors] = useState([]);

  //getting all orders that users has made
  useEffect(() => {
    classesapi.get(`api/instructors`).then(({ data }) => {
      console.log(data);
      setInstructors(data);
    });
  }, []);

  return (
    <Container>
      <Wrapper>
        <Header>
          <Title>OUR TEAM</Title>
        </Header>
      </Wrapper>
      <SimpleGrid minChildWidth="300px" spacing="40px" padding={"5%"}>
        {instructors.map((instructor: Instructor) => {
          return (
            <Box
              key={instructor.id}
              maxW="sm"
              borderRadius="full"
              overflow="hidden"
            >
              <Image
                width="100%"
                height="300px"
                objectFit="cover"
                src={instructor.profilePic}
                alt={instructor.name}
              />
              <Box p="1">
                <Center>
                  <Box
                    mt="1"
                    as="h1"
                    lineHeight="tight"
                    noOfLines={1}
                    fontWeight="semibold"
                    fontSize="20px"
                    textTransform="uppercase"
                  >
                    {instructor.name}
                  </Box>
                </Center>
              </Box>
              <Center>
                <Badge borderRadius="full" px="2" colorScheme="teal">
                  {instructor.category}
                </Badge>
              </Center>
            </Box>
          );
        })}
      </SimpleGrid>
    </Container>
  );
};

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 30px;
  margin: 20px;
  background: linear-gradient(
      rgba(255, 255, 255, 0.274),
      rgba(207, 207, 207, 0.815)
    ),
    url("https://media.istockphoto.com/photos/3d-abstract-background-with-ultraviolet-neon-lights-empty-frame-picture-id1191719793?b=1&k=20&m=1191719793&s=612x612&w=0&h=OMpsFvr6bZiuBkj0HnFyNNTU401COhP317Q_QSwmVpg=")
      center no-repeat;
  background-size: cover;
`;

const Header = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 80px;
  ${mobile({ fontSize: "50px" })}
`;

export default team;
