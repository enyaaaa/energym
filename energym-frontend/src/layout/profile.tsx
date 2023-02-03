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
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { authapi, localauthapi } from "../api/auth";

type Props = {};

const profile = (props: Props) => {
  // navigate users to another route
  const navigate = useNavigate();

  const [profile, setProfile] = useState<any>([]);

  useEffect(() => {
    authapi.get("/profile").then((res) => {
      if (res.data.status === 200) {
        setProfile(res.data.profile);
      } else if (res.data.status === 401) {
        navigate("/login");
      }
    });
  }, [setProfile]);

  return (
    <Container>
      <Wrapper>
        <Title>PROFILE</Title>

        <Center py={6}>
          {profile.map((item:any, idx:number) => {
            return (
              <Stack key={idx}
                w={{ sm: "100%", md: "540px" }}
                height={{ sm: "476px", md: "20rem" }}
                direction={{ base: "column", md: "row" }}
                bg={useColorModeValue("#000000e", "gray.900")}
                boxShadow={"2xl"}
                padding={4}
              >
                <Flex flex={1} bg="blue.200">
                  <Image
                    objectFit="cover"
                    boxSize="100%"
                    src={
                      item.profilePic
                    }
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
                    {item.name}
                  </Text>
                  <Text
                    fontWeight={600}
                    fontSize={"2xl"}
                    color={"#ffffff"}
                    size="sm"
                    mb={4}
                  >
                    @{item.username}
                  </Text>
                  <Text
                    fontWeight={500}
                    fontSize={"xl"}
                    color={"#ffffff"}
                    size="sm"
                    mb={4}
                  >
                    {item.email}
                  </Text>
                  <Text
                    fontWeight={500}
                    fontSize={"xl"}
                    color={"#ffffff"}
                    size="sm"
                    mb={4}
                  >
                    {item.mobile}
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
                    >
                      Logout
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            );
          })}
        </Center>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.158), rgba(0, 0, 0, 0.034)),
    url("https://img.freepik.com/premium-photo/gym-equpment-dark-background-3d-rendering_256339-185.jpg?w=1380")
      center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5%;
`;

const Wrapper = styled.div`
  width: 50%;
  background-color: rgba(29, 29, 29, 0.733);
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
