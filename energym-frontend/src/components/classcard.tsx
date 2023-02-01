import { Image, Box, Badge } from "@chakra-ui/react";
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

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={Classes.classImage} alt={Classes.classTitle} />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            {Classes.classType}
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {Classes.slots} SLOTS &bull; {Classes.classDuration}
          </Box>
        </Box>

        <Box mt="1" as="h4" lineHeight="tight" noOfLines={1}>
          {Classes.classTitle}
        </Box>
        <Box mt="1" as="h4" lineHeight="tight" noOfLines={1}>
          {Classes.classStartDateTime}
        </Box>
        <Box mt="1" as="h4" lineHeight="tight" noOfLines={1}>
          {Classes.classStartDateTime}
        </Box>
      </Box>
    </Box>
  );
};

export default classcard;
