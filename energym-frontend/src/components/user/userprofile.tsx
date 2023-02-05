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
import { CloudFog } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authapi } from "../../api/auth";
import { UserProfileInfo } from "../../utils/types";

interface ProfileProps {
    Profile: UserProfileInfo;
  }

const userprofile = ({ Profile }: ProfileProps) => {
  // navigate users to another route
  const navigate = useNavigate();

  const [profile, setProfile] = useState<ProfileProps[]>([]);

  useEffect(() => {
    authapi.get("api/profile").then((res) => {
      if (res.data.status === 200) {
        setProfile(res.data.profile);
      } else if (res.data.status === 401) {
        /* navigate("/login"); */
        console.log("test")
      }
    });
  }, []);

  return (
    <Stack
      w={{ sm: "100%", md: "540px" }}
      height={{ sm: "476px", md: "20rem" }}
      direction={{ base: "column", md: "row" }}
      boxShadow={"2xl"}
      padding={4}
    >
      <Flex flex={1} bg="blue.200">
        <Image objectFit="cover" boxSize="100%" src={Profile.profilePic} />
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
          Profile.name
        </Text>
        <Text fontWeight={600} fontSize={"2xl"} size="sm" mb={4}>
          @Profile.username
        </Text>
        <Text fontWeight={500} fontSize={"xl"} size="sm" mb={4}>
          Profile.email
        </Text>
        <Text fontWeight={500} fontSize={"xl"} size="sm" mb={4}>
          Profile.mobile
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
};

export default userprofile;
