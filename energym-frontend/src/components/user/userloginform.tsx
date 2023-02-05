import React, { SyntheticEvent, useContext, useState } from "react";
import styled from "styled-components";
import { NavLink as Link, useNavigate, useLocation } from "react-router-dom";
import { useToast, Input } from "@chakra-ui/react";
import { authapi } from "../../api/auth";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const login = () => {

  const { setAuth }:any = useAuth();

  const toast = useToast();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [loginInput, setLogin] = useState<any>({
    email: "",
    password: "",
    error_list: [],
  });

  const handleInput = (e: any) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  };

  const loginSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };
    authapi.get("/sanctum/csrf-cookie").then((response) => {
      authapi.post(`api/login`, data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("user_id", res.data.user_id);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("mobile", res.data.mobile);
          localStorage.setItem("auth_username", res.data.username);
          localStorage.setItem("profilePic", res.data.profilePic);
          setAuth(res.data.token)
          toast({
            title: "Login Successfully",
            description: res.data.message,
            status: "success",
            duration: 9000,
            isClosable: true,
          });

          navigate(from, { replace: true });
        } else if (res.data.status === 404) {
          toast({
            title: "Try Again, Email or Password Invalid",
            description: res.data.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else {
          setLogin({ ...loginInput, error_list: res.data.validation_errors });
        }
      });
    });
  };

  return (
    <Container>
      <Wrapper>
        <Title>LOGIN</Title>
        <Form onSubmit={loginSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="email"
            onChange={handleInput}
            value={loginInput.email}
            margin="10px 0"
            size="lg"
          />
          <Validation>{loginInput.error_list.email}</Validation>
          <Input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleInput}
            value={loginInput.password}
            margin="10px 0"
            size="lg"
          />
          <Validation>{loginInput.error_list.password}</Validation>
          <ForgetPasswowrdLink to="/">FORGET PASSWORD?</ForgetPasswowrdLink>
          <Button type="submit">SIGN IN</Button>
          <CreateAccountLink to="/register">CREATE ACCOUNT</CreateAccountLink>
        </Form>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  padding: 30px;
  display: flex;
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
  padding: 15px 10px;
  border-radius: 10px;
  background-color: #6bbbb4;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  justify-content: center;
`;

const ForgetPasswowrdLink = styled(Link)`
  text-align: end;
  font-size: 12px;
  text-decoration: none;
  cursor: pointer;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const CreateAccountLink = styled(Link)`
  font-size: 12px;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
`;

export default login;
