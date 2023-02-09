import { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../utils/responsive";
import {
  SimpleGrid,
  Image,
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Badge,
} from "@chakra-ui/react";
import { classesapi } from "../api/classes";
import { Instructor } from "../utils/types";

const classescategory = () => {
  //using state
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    classesapi.get(`api/instructors`).then((res) => {
      if (res.data.status === 200) {
        setInstructors(res.data.instructors);
      }
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
        {instructors.map((Instructors: Instructor) => {
          return (
            <Center py={12} key={Instructors.id}>
              <Box
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
                  rounded={"lg"}
                  mt={-12}
                  pos={"relative"}
                  height={"230px"}
                  _after={{
                    transition: "all .3s ease",
                    content: '""',
                    w: "full",
                    h: "full",
                    pos: "absolute",
                    top: 5,
                    left: 0,
                    backgroundImage: `url(${Instructors.profilePic})`,
                    filter: "blur(15px)",
                    zIndex: -1,
                  }}
                  _groupHover={{
                    _after: {
                      filter: "blur(20px)",
                    },
                  }}
                >
                  <Image
                    rounded={"lg"}
                    height={230}
                    width={282}
                    objectFit={"cover"}
                    src={Instructors.profilePic}
                  />
                </Box>
                <Stack pt={10} align={"center"}>
                  <Text
                    color={"gray.500"}
                    fontSize={"sm"}
                    textTransform={"uppercase"}
                  >
                    {Instructors.username}
                  </Text>
                  <Heading
                    fontSize={"2xl"}
                    fontFamily={"body"}
                    fontWeight={500}
                  >
                    {Instructors.name}
                  </Heading>
                  <Badge borderRadius="full" px="2" colorScheme="teal">
                    {Instructors.category}
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
  padding: 50px;
  ${mobile({ padding: "30px" })}
`;

const Title = styled.h1`
  text-align: center;
  text-transform: uppercase;
  font-size: 80px;
  ${mobile({ fontSize: "50px" })}
`;

export default classescategory;
