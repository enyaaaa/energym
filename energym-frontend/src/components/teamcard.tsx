import {
  Card,
  Stack,
  CardBody,
  Image,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
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
    classesapi.get(`instructors`).then(({ data }) => {
      console.log(data);
      setInstructors(data);
    });
  }, []);

  return (
    <Card background={"black"} padding={"3%"} key={instructor.id}>
      <CardBody>
        <Image
          width="100%"
          height="300px"
          objectFit="cover"
          src={instructor.profilePic}
          alt={instructor.name}
        />
        <Stack mt="6" spacing="1" textAlign={"center"}>
          <Heading size="md">{instructor.name}</Heading>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default teamcard;
