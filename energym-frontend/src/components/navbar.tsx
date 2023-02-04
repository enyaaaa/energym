import React from "react";
import styled from "styled-components";
import { Avatar } from '@chakra-ui/react'
import { NavLink as Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { User } from "phosphor-react";
import { mobile } from "../responsive";
import { ColorModeSwitcher } from "../utils/colormodeswitch";

type Props = {};

const navbar = (props: Props) => {
    //if user is not logged in it will relocate the user to login page else it will go to the profile page
    var Profile;
    if (!localStorage.getItem('auth_token')) {
      Profile = (
        <NavLink to='/login'><User size={32} /></NavLink>
      );
    } else {
      Profile = (
        <NavLink to='/profile'><Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' /></NavLink>
      );
    }

  return (
    <Container>
      <Wrapper>
        <Left>
          <NavLink to="/">
            <Image src={logo} />
          </NavLink>
        </Left>
        <Right>
          <ColorModeSwitcher/>
          <NavLink to="/ourclass">BOOK A CLASS</NavLink>
          <NavLink to="/ourteam">OUR TEAM</NavLink>
          <NavLink to="/forum">FAQ</NavLink>
          {Profile}
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
  ${mobile({ height: "150px" })}
`;

const Wrapper = styled.div`
  padding: 20px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "20px 0", flexDirection: "column"})}
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
  ${mobile({ padding: "0 0.5rem "})}
`;

const Right = styled.div`
  display: flex;
`;

export default navbar;
