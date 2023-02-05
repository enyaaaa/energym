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
import { authapi } from "../api/auth";
import UserProfile from '../components/user/userprofile'
import { UserProfileInfo } from "../utils/types";

type Props = {};

const profile = (props: Props) => {
  // navigate users to another route
  const navigate = useNavigate();

  const [profile, setProfile] = useState([]);

  useEffect(() => {
    authapi.get("api/profile").then((res) => {
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
          {profile.map((Profile: UserProfileInfo) => {
            return (
              <UserProfile Profile={Profile} key={Profile.id}></UserProfile>
            );
          })}
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
