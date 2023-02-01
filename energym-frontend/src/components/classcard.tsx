import {
  Card,
  Stack,
  CardBody,
  Image,
  Heading,
  Text,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { classesapi } from "../api/classes";
import { Class } from "../utils/types";

interface ClassProps {
  Classes: Class;
}

const classcard = ({ Classes }: ClassProps) => {
  //using the type that the user has clicked
  const { category } = useParams();

  //using state
  const [classes, setClasses] = useState<ClassProps[]>([]);

  //getting all orders that users has made
  useEffect(() => {
    classesapi.get(`classes/${category}`).then(({ data }) => {
      console.log(data);
      setClasses(data);
    });
  }, []);

  if (Classes?.length > 0) {
    return (
      <Center>
        <Text>No Classes Avaliable For Booking</Text>
      </Center>
    );
  } else {
    return (
      <Card background={"black"} padding={"3%"} key={Classes.id}>
        <CardBody>
          <Image
            width="100%"
            height="300px"
            objectFit="cover"
            src={Classes.classImage}
            alt={Classes.classTitle}
          />
          <Stack mt="6" spacing="1" textAlign={"center"}>
            <Heading size="md">{Classes.classStartDateTime}</Heading>
          </Stack>
        </CardBody>
      </Card>
    );
  }
};

export default classcard;
