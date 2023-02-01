import { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import TeamCard from "../components/teamcard";
import {
  Card,
  Stack,
  CardBody,
  Image,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import { classesapi } from "../api/classes";
import { Instructor } from "../utils/types";

const team = () => {
  //using state
  const [instructors, setInstructors] = useState([]);

  //getting all orders that users has made
  useEffect(() => {
    classesapi.get(`instructors`).then(({ data }) => {
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
            <TeamCard instructor={instructor} key={instructor.id}></TeamCard>
          );
        })}
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

export default team
