import {
  Button,
  Center,
  Flex,
  Image,
  Stack,
  Text,
  useToast,
  Badge,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../../utils/responsive";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { classesapiToken } from "../../api/classes";
import { resetInstructor } from "../../redux/instructorSlice";
import { Alert } from "../alert";

const profile = () => {
  // navigate users to another route
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector(
    (state: RootState) => state.instructor.instructor
  );
  const authinstructor = useSelector((state: RootState) => state.instructor);

  const toast = useToast();

  const toInstructorEditProfile = () => {
    navigate("/instructoreditprofile", { state: profile });
  };

  //function when user click on logout
  const logoutSubmit = (e: any) => {
    e.preventDefault();

    classesapiToken(authinstructor.token)
      .post(`api/logout`)
      .then((res) => {
        if (res.data.status === 200) {
          dispatch(resetInstructor());
          localStorage.removeItem('auth_token');
        localStorage.removeItem('code');
          toast({
            title: res.data.message,
            status: "success",
            duration: 4000,
            isClosable: true,
          });
          navigate("/", { replace: true });
        } else {
          console.log(authinstructor.token);
        }
      });
  };

  useEffect(() => {
    if (authinstructor.token == "") {
      navigate("/instructorlogin");
    }
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>PROFILE</Title>
      </Wrapper>
      <Center>
        <Stack
          w={{ sm: "100%", md: "540px" }}
          height={{ sm: "476px", md: "25rem" }}
          direction={{ base: "column", md: "row" }}
          boxShadow={"2xl"}
          padding={"20px"}
        >
          <Flex>
            <Image
              width={"250px"}
              height={"250px"}
              objectFit="cover"
              borderRadius={"100%"}
              src={profile?.profilePic}
            />
          </Flex>

          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
            pt={2}
          >
            <Label>name</Label>
            <Text fontWeight={500} fontSize={"xl"}>
              {profile?.name}
            </Text>
            <Label>username</Label>
            <Text fontWeight={6500} fontSize={"xl"} size="sm" mb={4}>
              @{profile?.username}
            </Text>
            <Label>email</Label>
            <Text fontWeight={500} fontSize={"xl"} size="sm" mb={4}>
              {profile?.email}
            </Text>
            <Label>mobile</Label>
            <Text fontWeight={500} fontSize={"xl"} size="sm" mb={4}>
              {profile?.mobile}
            </Text>
            <Label>category</Label>
            <Badge borderRadius="full" px="2" colorScheme="teal">
              {profile?.category}
            </Badge>
            <Stack
              width={"70%"}
              mt={"2rem"}
              direction={"row"}
              padding={"10px"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Button
                onClick={() => {
                  toInstructorEditProfile();
                }}
                bg={"#6bbbb4"}
                color={"#ffffff"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "blue.500",
                }}
              >
                edit
              </Button>
              <Alert action="logout" title="Are you sure you want to logout?" trigger={logoutSubmit} />
            </Stack>
          </Stack>
        </Stack>
      </Center>
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

const Title = styled.h1`
  text-align: center;
  font-size: 80px;
  ${mobile({ fontSize: "50px" })}
`;

const Label = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: rgb(151, 150, 150);
`;

export default profile;
