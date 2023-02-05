import { Image, Box, Center, Badge } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { classesapi } from "../api/classes";
import { Instructor } from "../utils/types";

interface InstructorProps {
  instructor: Instructor;
}

const teamcard = ({ instructor }: InstructorProps) => {
  //using state
  const [instructors, setInstructors] = useState<InstructorProps[]>([]);

  //getting all orders that users has made
  useEffect(() => {
    classesapi.get(`api/instructors`).then(({ data }) => {
      console.log(data);
      setInstructors(data);
    });
  }, []);

  return (
    <Box maxW="sm" borderRadius="full" overflow="hidden">
      <Image
        width="100%"
        height="300px"
        objectFit="cover"
        src={instructor.profilePic}
        alt={instructor.name}
      />
      <Box p="1">
        <Center>
          <Box
            mt="1"
            as="h1"
            lineHeight="tight"
            noOfLines={1}
            fontWeight="semibold"
            fontSize="20px"
            textTransform="uppercase"
          >
            {instructor.name}
          </Box>
        </Center>
      </Box>
      <Center>
        <Badge borderRadius="full" px="2" colorScheme="teal">{instructor.category}</Badge>
      </Center>
    </Box>
  );
};

export default teamcard;
