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
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { resetUser } from "../redux/userSlice";

const profile = () => {
  // navigate users to another route
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.user.user);
  const authuser = useSelector((state: RootState) => state.user);

  const toast = useToast();

  //function when user click on logout
  const logoutSubmit = (e: any) => {
    e.preventDefault();

    authapiToken(authuser.token)
      .post(`api/logout`)
      .then((res) => {
        if (res.data.status === 200) {
          dispatch(resetUser());
          toast({
            title: res.data.message,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          navigate("/", { replace: true });
        } else {
          console.log(authuser.token);
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
          <Title>PROFILE</Title>
      </Wrapper>
      <Center>
          <Stack
            w={{ sm: "100%", md: "540px" }}
            height={{ sm: "476px", md: "20rem" }}
            direction={{ base: "column", md: "row" }}
            boxShadow={"2xl"}
            padding={4}
          >
            <Flex>
              <Image
                objectFit="cover"
                borderRadius={'100%'}
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

export default profile;
