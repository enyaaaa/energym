import React, { useState } from "react";
import styled from "styled-components";
import { NavLink as Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { authapi } from "../api/auth";
import { useForm } from "react-hook-form";

interface UserProps {
  username: string;
  email: string;
  mobile: number;
  password: string;
  confirmPassword: string;
}

const register = ({}: UserProps) => {
  //navigate user to another page
  const navigate = useNavigate();

  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<UserProps>();

  const onSubmit = (data: UserProps) => {
    // api call
    authapi.post("/register", data).then(
      (res) => {
        console.log(res.data);
        toast({
          title: "Account created.",
          description: res.data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate('/login', { replace: true });
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };

  return (
    <Container>
      <Wrapper>
        <Title>REGISTER</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="username"
            {...register("username", {
              required: "Username is Required",
            })}
          />
          <Validation>{errors.username?.message}</Validation>
          <Input
            type="text"
            placeholder="email"
            {...register("email", {
              required: "Email is Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          <Validation>{errors.email?.message}</Validation>
          <Input
            type="tel"
            placeholder="mobile"
            {...register("mobile", {
              required: "Mobile is Required",
              minLength: {
                value: 8,
                message: "Mobile must have at least 8 characters",
              },
            })}
          />
          <Validation>{errors.mobile?.message}</Validation>
          <Input
            type="password"
            placeholder="password"
            {...register("password", {
              required: "Password is Required",
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
              },
            })}
          />
          <Validation>{errors.password?.message}</Validation>
          <Input
            type="password"
            placeholder="confirm password"
            {...register("confirmPassword", {
              required: "Password Confirmation is Required",
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
              },
              validate: (value) =>
                value === getValues().password || "The passwords do not match",
            })}
          />
          <Validation>{errors.confirmPassword?.message}</Validation>
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

export default register;
