import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, NavLink as Link } from "react-router-dom";
import { RootState } from "../../store";
import styled from "styled-components";
import { mobile } from "../../utils/responsive";
import {
  Heading,
  Text,
  Box,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";
import { Bookingclassroommodel } from "../../components/instructor/classroombookingmodel";

const classrooms = () => {
  const navigate = useNavigate();
  const authinstructor = useSelector((state: RootState) => state.instructor);

  useEffect(() => {
    if (authinstructor.token == "") {
      navigate("/instructorlogin");
    }
  }, []);

  const category = [
    {
      id: 1,
      badge: "spin",
      header: "STUDIO 1",
      desc: "Indoor cycling, classes focus on endurance, strength, intervals, high intensity, and recuperation.",
      img: "https://voguesg.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2022/01/13133338/spin-studios-crnk.jpg",
      link: "spinstudio",
    },
    {
      id: 2,
      badge: "yoga",
      header: "STUDIO 2",
      desc: "Physical exercise that consists of postures, frequently connected by flowing sequences.",
      img: "https://i.pinimg.com/564x/36/c9/75/36c975202f5af6b38b421e85da705651.jpg",
      link: "yogastudio",
    },
    {
      id: 3,
      badge: "pilates",
      header: "STUDIO 3",
      desc: "Pilates is a set of repetitive movements done on a mat or other apparatus to increase flexibility, strength, and balance. Pilates movements strengthen the body by putting physical effort from the core outward.",
      img: "https://i.pinimg.com/564x/f2/84/d8/f284d8ba819f691a44f07614c33869e2.jpg",
      link: "pilatesstudio",
    },
    {
      id: 4,
      badge: "dance",
      header: "STUDIO 4",
      desc: "Dance, the movement of the body in a rhythmic way, usually to music and within a given space, for the purpose of expressing an idea or emotion, releasing energy, or simply taking delight in the movement itself.",
      img: "https://i.pinimg.com/564x/ab/4b/5f/ab4b5f222cd6c7e81c5f86c1138821cf.jpg",
      link: "hiitstudio",
    },
    {
      id: 5,
      badge: "hiit",
      header: "STUDIO 5",
      desc: "Exercise plan that mixes brief bursts of vigorous exercise with less vigorous but still active 'recovery' periods. In an HIIT class, the objective is to maintain a target heart rate for exercise, which enables you to burn fat quickly in a short period of time.",
      img: "https://i.pinimg.com/564x/7f/7d/fe/7f7dfe129b8a7f56f3734d49318a250c.jpg",
      link: "hiitstudio",
    },
  ];

  return (
    <Container>
      <Wrapper>
        <Header>
          <Title>STUDIOS</Title>
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
              mx={[0, 3]}
              overflow={"hidden"}
              bg="white"
              border={"1px"}
              borderColor="black"
              boxShadow={useColorModeValue(
                "6px 6px 0 #94d3db",
                "6px 6px 0 #5e83c7"
              )}
            >
              <Box h={"200px"} borderBottom={"1px"} borderColor="black">
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
                <Box
                  bg="black"
                  display={"inline-block"}
                  px={2}
                  py={1}
                  color="white"
                  mb={2}
                >
                  <Text
                    textTransform={"uppercase"}
                    fontSize={"xs"}
                    fontWeight="medium"
                  >
                    {item.badge}
                  </Text>
                </Box>
                <Heading
                  textTransform={"uppercase"}
                  color={"black"}
                  fontSize={"2xl"}
                  noOfLines={1}
                >
                  {item.header}
                </Heading>
                <Text color={"gray.500"} noOfLines={3}>
                  {item.desc}
                </Text>
              </Box>
              <HStack borderTop={"1px"} color="black">
                <Flex
                  p={4}
                  alignItems="center"
                  justifyContent={"space-between"}
                  roundedBottom={"sm"}
                  cursor={"pointer"}
                  w="full"
                >
                  <Bookingclassroommodel
                    classroom={item.header}
                    classType={item.badge}
                    classImage={item.img}
                  />
                </Flex>
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
  background-color: #a8cecb;
  &:hover {
    background-color: #a1e2dd;
  }
`;

const Content = styled.div``;

export default classrooms;
