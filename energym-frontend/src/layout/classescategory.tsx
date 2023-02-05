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
    classesapi.get(`api/classes/${category}`).then(({ data }) => {
      console.log(data);
      setClasses(data);
    });
  }, []);

  return (
    <Container>
      <Wrapper>
        <Header>
          <Title>{category} CLASSES</Title>
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