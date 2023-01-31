import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import {
  Card,
  Stack,
  CardBody,
  CardFooter,
  Image,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";

type Props = {};

const team = (props: Props) => {
  const team = [
    {
      img: "https://media.istockphoto.com/id/876164838/photo/asian-workout-woman-showing-milk-bottle-during-break-or-relax-food-drinks-and-healthy-concept.jpg?s=612x612&w=0&k=20&c=zE0MSC0u5EuosLSpGP7GrvE-bQMADezLyl7R1OKbszc=",
      username: "Nicole",
    },
    {
      img: "https://media.istockphoto.com/id/876164838/photo/asian-workout-woman-showing-milk-bottle-during-break-or-relax-food-drinks-and-healthy-concept.jpg?s=612x612&w=0&k=20&c=zE0MSC0u5EuosLSpGP7GrvE-bQMADezLyl7R1OKbszc=",
      username: "Nicole",
    },
    {
      img: "https://images.unsplash.com/photo-1599552683573-9dc48255fe85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80",
      username: "Nicole",
    },
    {
      img: "https://media.istockphoto.com/id/876164838/photo/asian-workout-woman-showing-milk-bottle-during-break-or-relax-food-drinks-and-healthy-concept.jpg?s=612x612&w=0&k=20&c=zE0MSC0u5EuosLSpGP7GrvE-bQMADezLyl7R1OKbszc=",
      username: "Nicole",
    },
    {
      img: "https://media.istockphoto.com/id/876164838/photo/asian-workout-woman-showing-milk-bottle-during-break-or-relax-food-drinks-and-healthy-concept.jpg?s=612x612&w=0&k=20&c=zE0MSC0u5EuosLSpGP7GrvE-bQMADezLyl7R1OKbszc=",
      username: "Candy",
    },
  ];
  return (
    <Container>
      <Wrapper>
        <Header>
          <Title>OUR TEAM</Title>
        </Header>
      </Wrapper>
      <SimpleGrid minChildWidth="300px" spacing="40px">
        {team.map((item, index) => (
          <Card background={"black"}>
            <CardBody>
              <Image
                width="100%"
                height="400px"
                objectFit="cover"
                src={item.img}
                alt={item.username}
              />
              <Stack mt="6" spacing="1" textAlign={"center"}>
                <Heading size="md">{item.username}</Heading>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
};

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 30px;
  background: linear-gradient(rgba(27, 27, 27, 0.562), rgba(19, 19, 19, 0.938)),
    url("https://d1.awsstatic.com/events/aws-hosted-events/2020/APAC/Summit%202020/sydney/les-mills-image-800x513.b06735d502e32586d38197535b1cb26cc43993f9.png")
      center;
`;

const Header = styled.div`
  padding: 50px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 80px;
  ${mobile({ fontSize: "50px" })}
`;

export default team;
