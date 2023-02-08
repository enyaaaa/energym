import React, { useEffect } from "react";
import styled from "styled-components";
import { Avatar } from "@chakra-ui/react";
import { NavLink as Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { User } from "phosphor-react";
import { mobile } from "../utils/responsive";
import { ColorModeSwitcher } from "../utils/colormodeswitch";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const navbar = () => {
  //if user is not logged in it will relocate the user to login page else it will go to the profile page
  var Profile;
  var Booking;
  var Classes;
  const authuser = useSelector((state: RootState) => state.user);
  const Uprofile = useSelector((state: RootState) => state.user.user);

  const authinstructor = useSelector((state: RootState) => state.instructor);
  const Iprofile = useSelector(
    (state: RootState) => state.instructor.instructor
  );

  if (authuser.token == "" && authinstructor.token == "") {
    Profile = (
      <NavLink to="/login">
        <User size={32} />
      </NavLink>
    );
  } else if (authinstructor.token != "") {
    Profile = (
      <NavLink to="/instructorprofile">
        <Avatar name={Iprofile?.name} src={Iprofile?.profilePic} />
      </NavLink>
    );
  } else if (authuser.token != "") {
    Profile = (
      <NavLink to="/userprofile">
        <Avatar name={Uprofile?.name} src={Uprofile?.profilePic} />
      </NavLink>
    );
  }

  if (authuser.token == "" && authinstructor.token == "") {
    Booking = (
      <NavLink to="/ourclass">BOOK A CLASS</NavLink>
    );
  } else if (authinstructor.token != "") {
    Booking = (
      <NavLink to="/classrooms">BOOK A STUDIO</NavLink>
    );
  } else if (authuser.token != "") {
    Booking = (
      <NavLink to="/ourclass">BOOK A CLASS</NavLink>
    );
  }

  if (authuser.token == "" && authinstructor.token == "") {
    Classes = (
      <NavLink to="/ourteam">OUR TEAM</NavLink>
    );
  } else if (authinstructor.token != "") {
    Classes = (
      <NavLink to="/yourstudiobookings">BOOKINGS</NavLink>
    );
  } else if (authuser.token != "") {
    Classes = (
      <NavLink to="/yourclassbookings">BOOKINGS</NavLink>
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
          <ColorModeSwitcher />
          {Booking}
          {Classes}
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
  ${mobile({ padding: "20px 0", flexDirection: "column" })}
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
  ${mobile({ padding: "0 0.5rem " })}
`;

const Right = styled.div`
  display: flex;
`;

export default navbar;
