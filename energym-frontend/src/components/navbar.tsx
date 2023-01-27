import React from "react";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import logo from '../assets/logo.png';

type Props = {};

const navbar = (props: Props) => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <NavLink to="/">
            <Image src={logo} />
          </NavLink>
        </Left>
        <Center>
          <NavLink to="/ourclass">Class</NavLink>
        </Center>
        <Right>
          <NavLink to="/">icon</NavLink>
        </Right>
      </Wrapper>
    </Container>
  );
};

const Image = styled.img`
  height: 80px;
  width: auto;
`;

const Container = styled.div`
  height: 70px;
  
`;

const Wrapper = styled.div`
  padding: 10px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const NavLink = styled(Link)`
  color: #000;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &:hover {
    color: #bb7b6b;
  }
`;

const Logo = styled.h1`
  color: #bb7b6b;
  font-family: "Abril Fatface", cursive;
  font-weight: 400;
`;

const Center = styled.div`
  display: flex;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

export default navbar;
