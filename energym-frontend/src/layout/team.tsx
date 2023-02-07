import { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../utils/responsive";
import {
  Image,
  Box,
  Center,
  Badge,
  useColorModeValue,
  Heading,
  Text,
  Stack,
} from "@chakra-ui/react";
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
            <Center py={12}>
              <Box
                key={instructor.id}
                role={"group"}
                p={6}
                maxW={"330px"}
                w={"full"}
                bg={useColorModeValue("white", "gray.800")}
                boxShadow={"2xl"}
                rounded={"lg"}
                pos={"relative"}
                zIndex={1}
              >
                <Box
                  rounded={'lg'}
                  mt={-12}
                  pos={'relative'}
                  height={'230px'}
                  _after={{
                    transition: 'all .3s ease',
                    content: '""',
                    w: 'full',
                    h: 'full',
                    pos: 'absolute',
                    top: 5,
                    left: 0,
                    backgroundImage: instructor.profilePic,
                    filter: 'blur(15px)',
                    zIndex: -1,
                  }}
                  _groupHover={{
                    _after: {
                      filter: "blur(20px)",
                    },
                  }}
                >
                  <Image
                    rounded={'lg'}
                    height={230}
                    width={282}
                    objectFit={'cover'}
                    src={instructor.profilePic}
                    alt={instructor.name}
                  />
                </Box>
                <Stack pt={10} align={"center"}>
                  <Text
                    color={"gray.500"}
                    fontSize={"sm"}
                    textTransform={"uppercase"}
                  >
                    @{instructor.username}
                  </Text>
                  <Heading
                    fontSize={"2xl"}
                    fontFamily={"body"}
                    fontWeight={500}
                  >
                    {instructor.name}
                  </Heading>
                  <Badge borderRadius="full" px="2" colorScheme="teal">
                    {instructor.category}
                  </Badge>
                </Stack>
              </Box>
            </Center>
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
