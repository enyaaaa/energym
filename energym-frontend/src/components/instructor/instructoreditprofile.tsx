import {
  Button,
  Center,
  Image,
  Input,
  Stack,
  useToast,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authapiToken } from "../../api/auth";
import { classesapiToken } from "../../api/classes";
import { updateInstructor } from "../../redux/instructorSlice";
import { updateUser } from "../../redux/userSlice";
import { RootState } from "../../store";
import { mobile } from "../../utils/responsive";

const instructoreditprofile = () => {
  // navigate users to another route
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authinstructor = useSelector((state: RootState) => state.instructor);

  const toast = useToast();

  const [img, setImg] = useState<any>();

  //input of forms
  const [formData, setFormData] = useState<any>({
    username: authinstructor.instructor?.username,
    name: authinstructor.instructor?.name,
    email: authinstructor.instructor?.email,
    mobile: authinstructor.instructor?.mobile,
    profilePic: authinstructor.instructor?.profilePic,
    category: authinstructor.instructor?.category,
    error_list: [],
  });

  //handle users input
  const handleInput = (e: any) => {
    e.persist();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //function when user press on the submit button and edit the product and update on database
  const profileUpdate = (e:any) => {
    e.preventDefault();
    const data = new FormData();
    data.append('username', formData.username);
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('mobile', formData.mobile);
    data.append('category', formData.category);
    data.append('profilePic', img!);

    classesapiToken(authinstructor.token)
      .post(`api/updateprofile`, data)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 200) {
          console.log(res.data);
          dispatch(updateInstructor(res.data));
          toast({
            title: res.data.message,
            status: "success",
            duration: 4000,
            isClosable: true,
          });
          navigate("/instructorprofile", { replace: true });
        } else if (res.data.status === 404) {
          setFormData({ ...formData, error_list: res.data.validation_errors });
        } else if (res.data.status === 422) {
          toast({
            title: res.data.message,
            status: "error",
            duration: 4000,
            isClosable: true,
          });
          navigate("/userprofile", { replace: true });
        }
      });
  };
  return (
    <Container>
      <Wrapper>
        <Title>UPDATE PROFILE</Title>
      </Wrapper>
      <form onSubmit={profileUpdate} encType="multipart/form-data">
        <Center>
          <Stack
            w={{ sm: "100%", md: "540px" }}
            direction={{ base: "column", md: "column" }}
            boxShadow={"2xl"}
            padding={4}
          >
            <Image
              width={"150px"}
              height={"150px"}
              objectFit="cover"
              borderRadius={"100%"}
              src={authinstructor.instructor?.profilePic}
            />
            <Input
              type="file"
              name="profilePic"
              onChange={(event: any) => {
                const file: File = event.target.files[0];
                if (file) {
                  setImg(file);
                } else {
                  setImg(authinstructor.instructor?.profilePic);
                }
              }}
            />
            <Validation>{formData.error_list.profilePic}</Validation>
            <Stack flex={1} flexDirection="column" p={1} pt={2}>
              <Label>username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                defaultValue={authinstructor.instructor?.username}
                onChange={handleInput}
              />
              <Validation>{formData.error_list.username}</Validation>
              <Label>name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="name"
                defaultValue={authinstructor.instructor?.name}
                onChange={handleInput}
              />
              <Validation>{formData.error_list.name}</Validation>
              <Label>email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                defaultValue={authinstructor.instructor?.email}
                onChange={handleInput}
              />
              <Validation>{formData.error_list.email}</Validation>
              <Label>mobile</Label>
              <Input
                type="mobile"
                name="mobile"
                id="mobile"
                placeholder="mobile"
                defaultValue={authinstructor.instructor?.mobile}
                onChange={handleInput}
              />
              <Validation>{formData.error_list.mobile}</Validation>
              <Label>category</Label>
              <FormControl>
            <Select
              name="category"
              id="category"
              margin="8px 0"
              value={formData.category}
              onChange={handleInput}
            >
              <option value="--">---</option>
              <option value="yoga">yoga</option>
              <option value="spin">spin</option>
              <option value="pilates">pilates</option>
              <option value="hiit">hiit</option>
            </Select>
          </FormControl>
          <Validation>{formData.error_list.category}</Validation>
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
                  type="submit"
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
                  update
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Center>
      </form>
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

const Label = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: rgb(151, 150, 150);
`;

const Validation = styled.span`
  font-size: 12px;
  color: #6bbbb4;
`;

export default instructoreditprofile;
