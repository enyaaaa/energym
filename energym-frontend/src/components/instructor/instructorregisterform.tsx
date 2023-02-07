import { SyntheticEvent, useState } from "react";
import styled from "styled-components";
import { NavLink as Link, useNavigate } from "react-router-dom";
import {
  useToast,
  Input,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { authapi } from "../../api/auth";
import { classesapi } from "../../api/classes";

const instructorregisterform = () => {
  //navigate user to another page
  const navigate = useNavigate();

  const toast = useToast();

  //input field for form
  const [registerInput, setRegister] = useState<any>({
    username: "",
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    category: "",
    code: "",
    error_list: [],
    code_error:[]
  });

  //handing users input
  const handleInput = (e: any) => {
    e.persist();
    setRegister({ ...registerInput, [e.target.name]: e.target.value });
  };

  //function when users submit the form and add it into datebase
  const registerSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const data = {
      username: registerInput.username,
      name: registerInput.name,
      email: registerInput.email,
      mobile: registerInput.mobile,
      password: registerInput.password,
      confirmPassword: registerInput.confirmPassword,
      category: registerInput.category,
      code: registerInput.code,
    };

    classesapi.post(`api/register`, data).then((res) => {
      if (res.data.status === 200) {
        console.log(res.data);
        toast({
          title: res.data.message,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        navigate("/instructorlogin", { replace: true });
      } else {
        setRegister({
          ...registerInput,
          error_list: res.data.validation_errors,
        });
        toast({
          title: res.data.message,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    });
  };

  return (
    <Container>
      <Wrapper>
        <Title>REGISTER AS INSTRUCTOR</Title>
        <Form onSubmit={registerSubmit}>
          <Input
            margin="8px 0"
            size="lg"
            type="text"
            name="username"
            placeholder="username"
            onChange={handleInput}
            value={registerInput.username}
          />
          <Validation>{registerInput.error_list.username}</Validation>
          <Input
            margin="8px 0"
            size="lg"
            type="text"
            name="name"
            placeholder="name"
            onChange={handleInput}
            value={registerInput.name}
          />
          <Validation>{registerInput.error_list.name}</Validation>
          <Input
            margin="8px 0"
            size="lg"
            type="text"
            name="email"
            placeholder="email"
            onChange={handleInput}
            value={registerInput.email}
          />
          <Validation>{registerInput.error_list.email}</Validation>
          <Input
            margin="8px 0"
            size="lg"
            type="tel"
            name="mobile"
            placeholder="mobile"
            onChange={handleInput}
            value={registerInput.mobile}
          />
          <Validation>{registerInput.error_list.mobile}</Validation>
          <FormControl>
            <Select
              name="category"
              id="category"
              margin="8px 0"
              value={registerInput.category}
              onChange={handleInput}
            >
              <option value="--">---</option>
              <option value="yoga">yoga</option>
              <option value="spin">spin</option>
              <option value="pilates">pilates</option>
              <option value="hiit">hiit</option>
            </Select>
          </FormControl>
          <Validation>{registerInput.error_list.category}</Validation>
          <Input
            margin="8px 0"
            size="lg"
            type="password"
            name="password"
            placeholder="password"
            onChange={handleInput}
            value={registerInput.password}
          />
          <Validation>{registerInput.error_list.password}</Validation>
          <Input
            margin="8px 0"
            size="lg"
            type="password"
            name="confirmPassword"
            placeholder="confirm password"
            onChange={handleInput}
            value={registerInput.confirmPassword}
          />
          <Validation>{registerInput.error_list.comfirmPassword}</Validation>
          <Input
            margin="8px 0"
            size="lg"
            type="password"
            name="code"
            placeholder="verification code"
            onChange={handleInput}
            value={registerInput.code}
          />
          <Validation>{registerInput.error_list.code}</Validation>
          <Button type="submit">REGISTER</Button>
          <LoginLink to="/instructorlogin">AREADY HAVE AN ACCOUNT?</LoginLink>
        </Form>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 300px;
  border-radius: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Validation = styled.span`
  font-size: 12px;
  color: #6bbbb4;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  border-radius: 10px;
  background-color: #6bbbb4;
  color: white;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: center;
`;

const LoginLink = styled(Link)`
  font-size: 12px;
  text-decoration: none;
  cursor: pointer;
`;
export default instructorregisterform;
