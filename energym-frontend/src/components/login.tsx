import React from "react";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";

type Props = {};

const login = (props: Props) => {
  return (
    <Container>
      <Wrapper>
        <Title>LOGIN</Title>
        <Form>
          <Input type="email" name="email" placeholder="email" />
          <Validation>{}</Validation>
          <Input type="password" name="password" placeholder="password" />
          <Validation>{}</Validation>
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
  color: #ffffff;
  text-align: center;
  font-size: 12px;
  text-decoration: none;
  cursor: pointer;
  padding-bottom: 10px;
`;

const CreateAccountLink = styled(Link)`
  color: #ffffff;
  font-size: 12px;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
`;

export default login;
