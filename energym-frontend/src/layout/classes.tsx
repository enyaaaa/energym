import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { mobile } from "../responsive";
import { classesapi } from "../api/classes";
import { NavLink as Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Text,
  Stack,
  Button
} from "@chakra-ui/react";

type Props = {};

const classes = (props: Props) => {
  const [classes, setClasses] = useState([]);

  //getting products from api
  useEffect(() => {
    classesapi.get(`classes`).then(({ data }) => {
      console.log(data);
      setClasses(data);
    });
  }, []);

  const category = [
    {
      id:1,
      header: "SPIN",
      desc: "Indoor cycling, often known as spinning, is a type of exercise that involves using a specific stationary exercise bike with a weighted flywheel in a classroom setting. Classes focus on endurance, strength, intervals, high intensity, and recuperation.",
      img: "https://voguesg.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2022/01/13133338/spin-studios-crnk.jpg",
    },
    {
      id:2,
      header: "YOGA",
      desc: "Physical exercise that primarily consists of postures, frequently connected by flowing sequences, occasionally including breathing exercises, and frequently concluding with lying down relaxation or meditation.",
      img: "https://www.fitnessfirst.com.sg/-/media/project/evolution-wellness/fitness-first/south-east-asia/malaysia/classes/gentle-flow-yoga/gentle-flow-yoga-class-malaysia.jpg",
    },
    {
      id:3,
      header: "PILATES",
      desc: "Pilates is a set of repetitive movements done on a mat or other apparatus to increase flexibility, strength, and balance. Pilates movements strengthen the body by putting physical effort from the core outward.",
      img: "https://www.verywellfit.com/thmb/cuTXaANkoMHc1yH7AEPuchMe1jM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/82301405-56b35cc13df78cdfa004c35a.jpg",
    },
    {
      id:4,
      header: "HIIT",
      desc: "Exercise plan that mixes brief bursts of vigorous exercise with less vigorous but still active 'recovery' periods. In an HIIT class, the objective is to maintain a target heart rate for exercise, which enables you to burn fat quickly in a short period of time.",
      img: "https://img.livestrong.com/630x/photos.demandstudios.com/getty/article/79/22/175558978.jpg?type=webp",
    },
  ];

  return (
    <Container>
      <Wrapper>
        <Header>
          <Title>CLASSES</Title>
          <Desc>
            We have carefully designed training programs that are the ideal
            blend of clever programming and pleasurable movement. You can move
            your body anyway you like with everything from yoga to
            high-intensity interval training (HIIT).
          </Desc>
        </Header>
      </Wrapper>
      {category.map((item, index) => (
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          background={"black"}
          padding={"5%"}
          key={item.id}
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "500px" }}
            src={item.img}
            alt={item.header}
          />
          <Stack>
            <CardBody>
              <Heading
                fontFamily={"'Urbanist', sans-serif"}
                fontWeight={"400"}
                fontSize={"50px"}
              >
                {item.header}
              </Heading>
              <Text py="3">{item.desc}</Text>
            </CardBody>
            <CardFooter>
              <NavLink to={item.header}>EXPLORE {item.header} CLASSES</NavLink>
            </CardFooter>
          </Stack>
        </Card>
      ))}
    </Container>
  );
};

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 30px;
  background: linear-gradient(rgba(27, 27, 27, 0.562), rgba(19, 19, 19, 0.938)),
    url("https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80")
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

const Desc = styled.p`
  text-align: center;
  font-size: 15px;
  padding-left: 30%;
  padding-right: 30%;
  ${mobile({ paddingLeft: "0", paddingRight: "0" })}
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  padding: 10px;
  background-color: #4f5756;
  &:hover {
    color: #6bbbb4;
  }
`;

export default classes;
