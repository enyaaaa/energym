import { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../../utils/responsive";
import {
  SimpleGrid,
  Image,
  Box,
  Badge,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { classesapi } from "../../api/classes";
import { Class } from "../../utils/types";
import moment from "moment";
import { Classinfomodel } from "../../components/class/classinfomodel";
import { FileText } from "phosphor-react";
import { Bookingclassmodel } from "../../components/user/userbookingmodel";

const classescategory = () => {
  //using params to find type
  const { category } = useParams();

  //using state
  const [classes, setClasses] = useState([]);

  //getting all orders that users has made
  useEffect(() => {
    classesapi.get(`api/classes/${category}`).then((res) => {
      if (res.data.status === 200) {
        setClasses(res.data.classes);
      }
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
            <Box
              key={Classes.id}
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <Image
                height={"300px"}
                width="100%"
                objectFit={"cover"}
                src={Classes.classImage}
                alt={Classes.classTitle}
              />
              <Box p="6">
                <Flex justifyContent={"space-between"}>
                  <Box display="flex" alignItems="baseline">
                    <Badge borderRadius="full" px="2" colorScheme="teal">
                      {Classes.classType}
                    </Badge>
                    <Box
                      color="gray.500"
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="xs"
                      textTransform="uppercase"
                      ml="2"
                    >
                      {Classes.slots} slots &bull; {Classes.classDuration}
                    </Box>
                  </Box>
                  <Box display={"flex"}>
                    <Classinfomodel
                      instructorName={Classes.instructorName}
                      classTitle={Classes.classTitle}
                      classImage={Classes.classImage}
                      classType={Classes.classType}
                      classRoom={Classes.classRoom}
                      classStartDateTime={Classes.classStartDateTime}
                      classEndDateTime={Classes.classEndDateTime}
                      classDuration={Classes.classDuration}
                      price={Classes.price}
                      purpose={Classes.purpose}
                      description={Classes.description}
                      slots={Classes.slots}
                    />
                    <Popover>
                      <PopoverTrigger>
                        <FileText size={25} />
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Description</PopoverHeader>
                        <PopoverBody>{Classes.description}</PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Box>
                </Flex>
                <Box
                  mt="1"
                  as="h4"
                  lineHeight="tight"
                  noOfLines={1}
                  textTransform="uppercase"
                >
                  {Classes.classTitle}
                </Box>
                <Box
                  mt="1"
                  as="h4"
                  lineHeight="tight"
                  noOfLines={1}
                  textTransform="uppercase"
                >
                  INSTRUCTOR: {Classes.instructorName}
                </Box>
                <Box mt="1" as="h4" lineHeight="tight" noOfLines={1}>
                  TIME: {moment(Classes.classStartDateTime).format("h:mm A")}
                </Box>
                <Box mt="1" as="h4" lineHeight="tight" noOfLines={1}>
                  DATE:{" "}
                  {moment(Classes.classStartDateTime).format("YYYY-MM-DD")}
                </Box>
                <Box paddingTop={"15px"}>
                  <Bookingclassmodel
                    class_id={Classes.id}
                    classTitle={Classes.classTitle}
                    classType={Classes.classType}
                    classRoom={Classes.classRoom}
                    classStartDateTime={Classes.classStartDateTime}
                    classEndDateTime={Classes.classEndDateTime}
                    classDuration={Classes.classDuration}
                  />
                </Box>
              </Box>
            </Box>
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
