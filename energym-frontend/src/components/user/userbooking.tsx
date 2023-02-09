import { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../../utils/responsive";
import { Box, Badge, useToast, SimpleGrid } from "@chakra-ui/react";
import { Class } from "../../utils/types";
import moment from "moment";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { Alert } from "../alert";
import { useNavigate } from "react-router-dom";
import { bookingsapi } from "../../api/bookings";
import { Reviewmodel } from "../reviewmodel";

const userbooking = () => {
  const navigate = useNavigate();

  //using state
  const [bookings, setBookings] = useState<Array<Class>>([]);

  const user_id = useSelector((state: RootState) => state.user.user?.id);
  const authuser = useSelector((state: RootState) => state.user);

  const toast = useToast();

  //getting all orders that users has made
  useEffect(() => {
    bookingsapi.get(`api/bookings/${user_id}`).then((res) => {
      if (res.data.status === 200) {
        setBookings(res.data.booking);
      }
    });
  }, []);

  //function when user press on delete
  const handleDelete = (e: any, id: any) => {
    e.preventDefault();

    bookingsapi.delete(`/api/bookings/${id}`).then((res) => {
      if (res.data.status === 200) {
        toast({
          title: res.data.message,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } else if (res.data.status === 404) {
        toast({
          title: res.data.message,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    });
  };

  useEffect(() => {
    if (authuser.token == "") {
      navigate("/login");
    }
  }, []);

  return (
    <Container>
      <Wrapper>
        <Header>
          <Title>MY CLASSES</Title>
        </Header><Reviewmodel />
      </Wrapper>
      
      <SimpleGrid minChildWidth="300px" spacing="40px" padding={"5%"}>
        {bookings.map((Classes: Class) => {
          return (
            <Box
              key={Classes.id}
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <Box p="6">
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
                    {Classes.classDuration}
                  </Box>
                </Box>
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
                  CLASS ROOM: {Classes.classRoom}
                </Box>
                <Box mt="1" as="h4" lineHeight="tight" noOfLines={1}>
                  TIME: {moment(Classes.classStartDateTime).format("h:mm A")}
                </Box>
                <Box mt="1" as="h4" lineHeight="tight" noOfLines={1}>
                  DATE:{" "}
                  {moment(Classes.classStartDateTime).format("YYYY-MM-DD")}
                </Box>
                <Box paddingTop={"10px"}>
                  <Alert
                    action="delete booking"
                    title="Are you sure you want to delete your booking?"
                    trigger={(e: any) => handleDelete(e, Classes.id)}
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

export default userbooking;
