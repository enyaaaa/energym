import React, { useState } from "react";
import styled from "styled-components";
import { NavLink as Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { authapi } from "../api/auth";
import { useForm } from "react-hook-form";
import { RegisterForm } from "../utils/types";

const registerform = () => {
  //navigate user to another page
  const navigate = useNavigate();

  const toast = useToast();

  //input field for form
  const [registerInput, setRegister] = useState({
    username: "",
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    error_list: [],
  });

  //handing users input
  const handleInput = (e: any) => {
    e.persist();
    setRegister({ ...registerInput, [e.target.name]: e.target.value });
  };

  //function when users submit the form and add it into datebase
  const registerSubmit = (e: any) => {
    e.preventDefault();

    const data = {
      username: registerInput.username,
      name: registerInput.name,
      email: registerInput.email,
      mobile: registerInput.mobile,
      password: registerInput.password,
      confirmPassword: registerInput.confirmPassword,
    };

    authapi.post(`/register`, data).then((res) => {
      if (res.data.status === 200) {
        console.log(res.data);
        toast({
          title: "Account created.",
          description: res.data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/login", { replace: true });
      } else {
        setRegister({
          ...registerInput,
          error_list: res.data.validation_errors,
        });
      }
    });
  };

  return (
    <Container>
      <Wrapper>
        <Title>REGISTER</Title>
        <Form onSubmit={registerSubmit}>
            <Input type="text" name="username" placeholder="username" onChange={handleInput} value={registerInput.username} />
            <Validation>{registerInput.error_list.username}</Validation>
            <Input type="text" name="name" placeholder="name" onChange={handleInput} value={registerInput.name} />
            <Validation>{registerInput.error_list.name}</Validation>
            <Input type="text" name="email" placeholder="email" onChange={handleInput} value={registerInput.email} />
            <Validation>{registerInput.error_list.email}</Validation>
            <Input type="tel" name="mobile" placeholder="mobile" onChange={handleInput} value={registerInput.mobile} />
            <Validation>{registerInput.error_list.mobile}</Validation>
            <Input type="password" name="password" placeholder="password" onChange={handleInput} value={registerInput.password} />
            <Validation>{registerInput.error_list.password}</Validation>
            <Input type="password" name="confirmPassword" placeholder="confirm password" onChange={handleInput} value={registerInput.confirmPassword} />
            <Validation>{registerInput.error_list.comfirmPassword}</Validation>
            <Button type="submit">REGISTER</Button>
            <LoginLink to="/login">AREADY HAVE AN ACCOUNT?</LoginLink>
          </Form>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  padding: 30px;
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

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  color: #000000;
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
  color: #ffffff;
  font-size: 12px;
  text-decoration: none;
  cursor: pointer;
`;

export default registerform;
