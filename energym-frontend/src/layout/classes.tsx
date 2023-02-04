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
  Button,
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
      id: 1,
      header: "SPIN",
      desc: "Indoor cycling, often known as spinning, is a type of exercise that involves using a specific stationary exercise bike with a weighted flywheel in a classroom setting. Classes focus on endurance, strength, intervals, high intensity, and recuperation.",
      img: "https://voguesg.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2022/01/13133338/spin-studios-crnk.jpg",
      link: "spin",
    },
    {
      id: 2,
      header: "YOGA",
      desc: "Physical exercise that primarily consists of postures, frequently connected by flowing sequences, occasionally including breathing exercises, and frequently concluding with lying down relaxation or meditation.",
      img: "https://www.fitnessfirst.com.sg/-/media/project/evolution-wellness/fitness-first/south-east-asia/malaysia/classes/gentle-flow-yoga/gentle-flow-yoga-class-malaysia.jpg",
      link: "yoga",
    },
    {
      id: 3,
      header: "PILATES",
      desc: "Pilates is a set of repetitive movements done on a mat or other apparatus to increase flexibility, strength, and balance. Pilates movements strengthen the body by putting physical effort from the core outward.",
      img: "https://www.verywellfit.com/thmb/cuTXaANkoMHc1yH7AEPuchMe1jM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/82301405-56b35cc13df78cdfa004c35a.jpg",
      link: "pilates",
    },
    {
      id: 4,
      header: "HIIT",
      desc: "Exercise plan that mixes brief bursts of vigorous exercise with less vigorous but still active 'recovery' periods. In an HIIT class, the objective is to maintain a target heart rate for exercise, which enables you to burn fat quickly in a short period of time.",
      img: "https://img.livestrong.com/630x/photos.demandstudios.com/getty/article/79/22/175558978.jpg?type=webp",
      link: "hiit",
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
      <Content>
        {category.map((item) => (
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            padding={"2%"}
            key={item.id}
            marginBottom="30px"
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
                <NavLink to={item.link}>EXPLORE {item.header} CLASSES</NavLink>
              </CardFooter>
            </Stack>
          </Card>
        ))}
      </Content>
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
  background-color: #7fb9b3;
  &:hover {
    color: #6bbbb4;
  }
`;

const Content = styled.div`
  padding: 20px;
`;

export default classes;
