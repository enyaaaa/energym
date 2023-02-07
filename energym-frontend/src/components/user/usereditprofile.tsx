import {
  Button,
  Center,
  Image,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authapiToken } from "../../api/auth";
import { updateUser } from "../../redux/userSlice";
import { RootState } from "../../store";
import { mobile } from "../../utils/responsive";
import { Alert } from "../alert";

const usereditprofile = () => {
  // navigate users to another route
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authuser = useSelector((state: RootState) => state.user);

  const toast = useToast();

  const [img, setImg] = useState<any>();
  const [view, setView] = useState<any>();

  function onImageChange(e: any) {
    console.log(e.target.files);
    setImg(e.target.files[0]);
  }

  useEffect(() => {
    if (img) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setView(reader.result);
      };
      reader.readAsDataURL(img);
    } else {
      setView(authuser.user?.profilePic);
    }
  }, [img]);

  //input of forms
  const [formData, setFormData] = useState<any>({
    username: authuser.user?.username,
    name: authuser.user?.name,
    email: authuser.user?.email,
    mobile: authuser.user?.mobile,
    error_list: [],
  });

  //handle users input
  const handleInput = (e: any) => {
    e.persist();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //function when user press on the submit button and edit the product and update on database
  const profileUpdate = (e: any) => {
    e.preventDefault();
    const data = new FormData();
    data.append("username", formData.username);
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("mobile", formData.mobile);
    data.append("profilePic", img!);

    authapiToken(authuser.token)
      .post(`api/updateprofile`, data)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 200) {
          console.log(res.data);
          dispatch(updateUser(res.data));
          toast({
            title: res.data.message,
            status: "success",
            duration: 4000,
            isClosable: true,
          });
          navigate("/userprofile", { replace: true });
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
              src={view}
            />
            <Input
              type="file"
              name="profilePic"
              padding={"5px"}
              accept="image/*"
              onChange={onImageChange}
            />
            <Stack flex={1} flexDirection="column" p={1} pt={2}>
              <Label>username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                defaultValue={authuser.user?.username}
                onChange={handleInput}
              />
              <Validation>{formData.error_list.username}</Validation>
              <Label>name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="name"
                defaultValue={authuser.user?.name}
                onChange={handleInput}
              />
              <Validation>{formData.error_list.name}</Validation>
              <Label>email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                defaultValue={authuser.user?.email}
                onChange={handleInput}
              />
              <Validation>{formData.error_list.email}</Validation>
              <Label>mobile</Label>
              <Input
                type="mobile"
                name="mobile"
                id="mobile"
                placeholder="mobile"
                defaultValue={authuser.user?.mobile}
                onChange={handleInput}
              />
              <Validation>{formData.error_list.mobile}</Validation>
              <Stack
                width={"100%"}
                mt={"2rem"}
                direction={"row"}
                padding={2}
                justifyContent={"space-between"}
                alignItems={"center"}
                paddingTop={"30px"}
              >
                <Alert
                  action="update"
                  title="Want to make the chnages?"
                  trigger={profileUpdate}
                />
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

export default usereditprofile;
