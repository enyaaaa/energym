import React from "react";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { UserCircle } from "phosphor-react";

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
        <Right>
          <NavLink to="/ourclass">BOOK A CLASS</NavLink>
          <NavLink to="/ourteam">OUR TEAM</NavLink>
          <NavLink to="/forum">FAQ</NavLink>
          <NavLink to="/profile"><UserCircle size={32} /></NavLink>
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
  height: 90px;
`;

const Wrapper = styled.div`
  padding: 10px 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

export const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  cursor: pointer;
  &:hover {
    color: #6bbbb4;
  }
`;

const Right = styled.div`
  display: flex;
`;

export default navbar;
