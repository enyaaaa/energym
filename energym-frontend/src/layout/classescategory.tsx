import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import {
  SimpleGrid
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ClassCard from "../components/classcard";
import { classesapi } from "../api/classes";
import { Class } from "../utils/types";

const classescategory = () => {
  //using params to find type
  const { category } = useParams();

  //using state
  const [classes, setClasses] = useState([]);

  //getting all orders that users has made
  useEffect(() => {
    classesapi.get(`classes/${category}`).then(({ data }) => {
      console.log(data);
      setClasses(data);
    });
  }, []);

  return (
    <Container>
      <Wrapper>
        <Header>
          <Title>{category} SCHEDULE</Title>
        </Header>
      </Wrapper>
      <SimpleGrid minChildWidth="300px" spacing="40px" padding={"5%"}>
        {classes.map((Classes: Class) => {
          return (
            <ClassCard Classes={Classes} key={Classes.id}></ClassCard>
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
    url("https://www.i-fitness.be/system/location_images/images/000/000/396/original/BBB_0470.jpg?1645025968")
      center;
`;

const Header = styled.div`
  padding: 50px;
`;

const Title = styled.h1`
  text-align: center;
  text-transform: uppercase;
  font-size: 80px;
  ${mobile({ fontSize: "50px" })}
`;

export default classescategory;
