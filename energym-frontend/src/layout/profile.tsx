import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { authapi, authapiToken } from "../api/auth";
import { UserProfileInfo } from "../utils/types";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { resetUser } from "../redux/userSlice";

type Props = {};

const profile = (props: Props) => {
  // navigate users to another route
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.user.user);
  const authuser= useSelector((state: RootState) => state.user);

  const toast = useToast();

  const logout = () => {
    // console.log(token);
    dispatch(resetUser());
    // authapiToken(authuser.token)
    //   .post("api/logout")
    //   .then(
    //     (res) => {
    //       console.log(res.data)
    //       dispatch(resetUser());
    //     },
    //     (error) => {
    //       console.log(error.response.data);
    //     }
    //   );
  };

 //function when user click on logout
 const logoutSubmit = (e:any) => {
  e.preventDefault();

  authapiToken(authuser.token).post(`api/logout`).then(res => {
    if (res.data.status === 200) {
      dispatch(resetUser());
      toast({
        title: "Logout Successfully",
        description: res.data.message,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate("/", { replace: true });
    }
  });
}
  /* const [profile, setProfile] = useState<Array<UserProfileInfo>>([]);
  const token = localStorage.getItem("auth_token"); */

  /* useEffect(() => {
    authapiToken(token)
      .get("api/profile")
      .then((res) => {
        if (res.data.status === 200) {
          console.log("test");
          setProfile(res.data.profile);
        } else if (res.data.status === 401) {
          console.log("test");
          navigate("/login");
        }
      });
  }, [setProfile]); */
  useEffect(() => {
    if (authuser.token == "") {
      navigate("/login");
    }
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>PROFILE</Title>
        <Center py={6}>
          <Stack
            w={{ sm: "100%", md: "540px" }}
            height={{ sm: "476px", md: "20rem" }}
            direction={{ base: "column", md: "row" }}
            boxShadow={"2xl"}
            padding={4}
          >
            <Flex flex={1} bg="blue.200">
              <Image
                objectFit="cover"
                boxSize="100%"
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
              <Text fontWeight={600} fontSize={"2xl"}>
                {profile?.name}
              </Text>
              <Text fontWeight={600} fontSize={"2xl"} size="sm" mb={4}>
                @{profile?.username}
              </Text>
              <Text fontWeight={500} fontSize={"xl"} size="sm" mb={4}>
                {profile?.email}
              </Text>
              <Text fontWeight={500} fontSize={"xl"} size="sm" mb={4}>
                {profile?.mobile}
              </Text>
              <Stack
                width={"100%"}
                mt={"2rem"}
                direction={"row"}
                padding={2}
                justifyContent={"space-between"}
                alignItems={"center"}
                paddingTop={"30px"}
              >
                <Button
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  bg={"#6bbbb4"}
                  color={"#ffffff"}
                  boxShadow={
                    "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                  }
                  _hover={{
                    bg: "blue.500",
                  }}
                  _focus={{
                    bg: "blue.500",
                  }}
                >
                  edit
                </Button>
                <Button
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  bg={"#6bbbb4"}
                  color={"#ffffff"}
                  boxShadow={
                    "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                  }
                  _hover={{
                    bg: "blue.500",
                  }}
                  _focus={{
                    bg: "blue.500",
                  }}
                  onClick={logoutSubmit}
                >
                  Logout
                </Button>
              </Stack>
            </Stack>
          </Stack>
          {/* <UserProfile Profile={profile[0]}></UserProfile> */}
          {/* {profile.map((Profile: UserProfileInfo) => {
            return (
              <UserProfile Profile={Profile} key={Profile.id}></UserProfile>
            );
          })} */}
        </Center>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  margin: 1%;
  background: linear-gradient(
      rgba(255, 255, 255, 0.274),
      rgba(207, 207, 207, 0.815)
    ),
    url("https://img.freepik.com/premium-photo/gym-equpment-dark-background-3d-rendering_256339-185.jpg?w=1380")
      center no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4%;
`;

const Wrapper = styled.div`
  width: 50%;
  border-radius: 20px;
  text-align: center;
  padding: 3%;
  ${mobile({ paddingLeft: "20%", paddingRight: "20%", width: "90%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 400;
`;

export default profile;
