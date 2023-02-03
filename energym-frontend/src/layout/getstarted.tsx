import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { CircleWavyCheck } from "phosphor-react";
import styled from "styled-components";
import { mobile } from "../responsive";

type Props = {};

const getstarted = (props: Props) => {
  return (
    <Container>
      <Center py={6} width={"100%"}>
        <Box
          maxW={"330px"}
          w={"full"}
          bg={useColorModeValue("#7fc4be", "gray.800")}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
        >
          <Stack
            textAlign={"center"}
            p={6}
            color={useColorModeValue("gray.800", "white")}
            align={"center"}
          >
            <Text
              fontSize={"sm"}
              fontWeight={500}
              bg={useColorModeValue("#3e7e7981", "green.900")}
              p={2}
              px={3}
              color={"#ffffff"}
              rounded={"full"}
            >
              Hobby
            </Text>
            <Stack direction={"row"} align={"center"} justify={"center"}>
              <Text fontSize={"3xl"}>$</Text>
              <Text fontSize={"6xl"} fontWeight={800}>
                79
              </Text>
              <Text color={"#ffffff"}>/month</Text>
            </Stack>
          </Stack>

          <Box bg={useColorModeValue("#777c7c", "gray.900")} px={6} py={10}>
            <List spacing={3}>
              <ListItem display={"flex"}>
                <CircleWavyCheck size={30} color="#6bbbb4" />
                <Text padding={"5px"}>5.000 page views</Text>
              </ListItem>
              <ListItem display={"flex"}>
                <CircleWavyCheck size={30} color="#6bbbb4" />
                <Text padding={"5px"}>5.000 page views</Text>
              </ListItem>
              <ListItem display={"flex"}>
                <CircleWavyCheck size={30} color="#6bbbb4" />
                <Text padding={"5px"}>5.000 page views</Text>
              </ListItem>
              <ListItem display={"flex"}>
                <CircleWavyCheck size={30} color="#6bbbb4" />
                <Text padding={"5px"}>5.000 page views</Text>
              </ListItem>
            </List>

            <Button
              mt={10}
              w={"full"}
              bg={"#6fafaa"}
              color={"white"}
              rounded={"xl"}
              boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
              _hover={{
                bg: "#649b96",
              }}
            >
              Start your trial
            </Button>
          </Box>
        </Box>
      </Center>
      <Center py={6} width={"100%"}>
        <Box
          maxW={"330px"}
          w={"full"}
          bg={useColorModeValue("#7fc4be", "gray.800")}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
        >
          <Stack
            textAlign={"center"}
            p={6}
            color={useColorModeValue("gray.800", "white")}
            align={"center"}
          >
            <Text
              fontSize={"sm"}
              fontWeight={500}
              bg={useColorModeValue("#3e7e7981", "green.900")}
              p={2}
              px={3}
              color={"#ffffff"}
              rounded={"full"}
            >
              Hobby
            </Text>
            <Stack direction={"row"} align={"center"} justify={"center"}>
              <Text fontSize={"3xl"}>$</Text>
              <Text fontSize={"6xl"} fontWeight={800}>
                79
              </Text>
              <Text color={"#ffffff"}>/month</Text>
            </Stack>
          </Stack>

          <Box bg={useColorModeValue("#777c7c", "gray.900")} px={6} py={10}>
            <List spacing={3}>
              <ListItem display={"flex"}>
                <CircleWavyCheck size={30} color="#6bbbb4" />
                <Text padding={"5px"}>5.000 page views</Text>
              </ListItem>
              <ListItem display={"flex"}>
                <CircleWavyCheck size={30} color="#6bbbb4" />
                <Text padding={"5px"}>5.000 page views</Text>
              </ListItem>
              <ListItem display={"flex"}>
                <CircleWavyCheck size={30} color="#6bbbb4" />
                <Text padding={"5px"}>5.000 page views</Text>
              </ListItem>
              <ListItem display={"flex"}>
                <CircleWavyCheck size={30} color="#6bbbb4" />
                <Text padding={"5px"}>5.000 page views</Text>
              </ListItem>
            </List>

            <Button
              mt={10}
              w={"full"}
              bg={"#6fafaa"}
              color={"white"}
              rounded={"xl"}
              boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
              _hover={{
                bg: "#649b96",
              }}
            >
              Start your trial
            </Button>
          </Box>
        </Box>
      </Center>
      <Center py={6} width={"100%"}>
        <Box
          maxW={"330px"}
          w={"full"}
          bg={useColorModeValue("#7fc4be", "gray.800")}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
        >
          <Stack
            textAlign={"center"}
            p={6}
            color={useColorModeValue("gray.800", "white")}
            align={"center"}
          >
            <Text
              fontSize={"sm"}
              fontWeight={500}
              bg={useColorModeValue("#3e7e7981", "green.900")}
              p={2}
              px={3}
              color={"#ffffff"}
              rounded={"full"}
            >
              Hobby
            </Text>
            <Stack direction={"row"} align={"center"} justify={"center"}>
              <Text fontSize={"3xl"}>$</Text>
              <Text fontSize={"6xl"} fontWeight={800}>
                79
              </Text>
              <Text color={"#ffffff"}>/month</Text>
            </Stack>
          </Stack>

          <Box bg={useColorModeValue("#777c7c", "gray.900")} px={6} py={10}>
            <List spacing={3}>
              <ListItem display={"flex"}>
                <CircleWavyCheck size={30} color="#6bbbb4" />
                <Text padding={"5px"}>5.000 page views</Text>
              </ListItem>
              <ListItem display={"flex"}>
                <CircleWavyCheck size={30} color="#6bbbb4" />
                <Text padding={"5px"}>5.000 page views</Text>
              </ListItem>
              <ListItem display={"flex"}>
                <CircleWavyCheck size={30} color="#6bbbb4" />
                <Text padding={"5px"}>5.000 page views</Text>
              </ListItem>
              <ListItem display={"flex"}>
                <CircleWavyCheck size={30} color="#6bbbb4" />
                <Text padding={"5px"}>5.000 page views</Text>
              </ListItem>
            </List>

            <Button
              mt={10}
              w={"full"}
              bg={"#6fafaa"}
              color={"white"}
              rounded={"xl"}
              boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
              _hover={{
                bg: "#649b96",
              }}
            >
              Start your trial
            </Button>
          </Box>
        </Box>
      </Center>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 2%;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

export default getstarted;
