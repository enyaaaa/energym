import styled from "styled-components";
import { mobile } from "../../utils/responsive";
import { NavLink as Link } from "react-router-dom";
import {
  Heading,
  Text,
  Box,
  Img,
  Center,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { Classcategorymodel } from "../../components/class/classcategorymodel";

const classes = () => {
  const category = [
    {
      id: 1,
      header: "SPIN",
      desc: "Indoor cycling, often known as spinning, is a type of exercise that involves using a specific stationary exercise bike with a weighted flywheel in a classroom setting. Classes focus on endurance, strength, intervals, high intensity, and recuperation.",
      img: "https://mountainsidefitness.com/wp-content/uploads/2019/10/Cycle-v2.jpg",
      link: "spin",
    },
    {
      id: 2,
      header: "YOGA",
      desc: "Physical exercise that primarily consists of postures, frequently connected by flowing sequences, occasionally including breathing exercises, and frequently concluding with lying down relaxation or meditation.",
      img: "https://www.peerspace.com/resources/wp-content/uploads/yoga-studio-2048x1365.webp",
      link: "yoga",
    },
    {
      id: 3,
      header: "PILATES",
      desc: "Pilates is a set of repetitive movements done on a mat or other apparatus to increase flexibility, strength, and balance. Pilates movements strengthen the body by putting physical effort from the core outward.",
      img: "https://images.squarespace-cdn.com/content/v1/5c78b226ab1a621a891f6cfa/1610474147710-HDJ4ADJ7MKRABTS9GUGS/3PaxOneLegBridgeLandscape.jpg?format=750w",
      link: "pilates",
    },
    {
      id: 4,
      header: "DANCE",
      desc: "Dance, the movement of the body in a rhythmic way, usually to music and within a given space, for the purpose of expressing an idea or emotion, releasing energy, or simply taking delight in the movement itself.",
      img: "https://i.pinimg.com/564x/fd/85/61/fd8561f800eb7b10dfa8fef83d3500d8.jpg",
      link: "dance",
    },
    {
      id: 5,
      header: "HIIT",
      desc: "Exercise plan that mixes brief bursts of vigorous exercise with less vigorous but still active 'recovery' periods. In an HIIT class, the objective is to maintain a target heart rate for exercise, which enables you to burn fat quickly in a short period of time.",
      img: "https://media1.popsugar-assets.com/files/thumbor/Zk7XXXTUDwaIG9GXjtIJL4yqUpY/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2020/02/11/715/n/1922729/tmp_WFB1tt_359ee710b2f3a82f_image.jpg",
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
        <SimpleGrid minChildWidth="300px">
          {category.map((item) => (
            <Center py={6} key={item.id}>
              <Box
                w="xs"
                rounded={"sm"}
                my={5}
                mx={[0, 5]}
                overflow={"hidden"}
                bg="#dbf8f6"
              >
                <Box h={"200px"}>
                  <Img
                    src={item.img}
                    alt={item.header}
                    roundedTop={"sm"}
                    objectFit="cover"
                    h="full"
                    w="full"
                  />
                </Box>
                <Box p={4}>
                  <Heading
                    color={"black"}
                    fontSize={"2xl"}
                    noOfLines={1}
                    display={"flex"}
                    justifyContent={"space-between"}
                  >
                    {item.header}
                    <Classcategorymodel
                      header={item.header}
                      desc={item.desc}
                      img={item.img}
                      link={item.link}
                    />
                  </Heading>
                  <Text color={"gray.500"} noOfLines={2}>
                    {item.desc}
                  </Text>
                </Box>
                <HStack>
                  <NavLink to={item.link}>
                    EXPLORE {item.header} CLASSES
                  </NavLink>
                </HStack>
              </Box>
            </Center>
          ))}
        </SimpleGrid>
      </Content>
    </Container>
  );
};

const Container = styled.div``;

const Wrapper = styled.div`
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
  color: black;
  cursor: pointer;
  width: 100%;
  padding: 15px;
  &:hover {
    background-color: #a1e2dd;
  }
`;

const Content = styled.div``;

export default classes;
