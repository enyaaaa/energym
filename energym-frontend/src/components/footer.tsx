import React from "react";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { Envelope, Phone, MapPin } from "phosphor-react";
import logo from "../assets/logo_icon.png";
import { mobile } from "../responsive";

type Props = {};

const footer = (props: Props) => {
  return (
    <Container>
      <Left>
        <Logo>
          <Image src={logo} />
          <Logotitle>ENERGYM</Logotitle>
        </Logo>
        <Desc>
          Energym allow members to browse fitness video, classes, routines at
          their finger tips. Provides services like online booking for classes,
          watch videos of workouts, challengers and routines that users can
          follow at home, recommend recipes that users can do at home and forum
          for users to share their experience and reviews.
        </Desc>
        <Desc>© ENERGYM All Rights Reserved.</Desc>
      </Left>
      <Center>
        <Title>Links</Title>
        <List>
          <NavLink to="/ourclass">BOOK A CLASS</NavLink>
          <NavLink to="/ourteam">OUR TEAM</NavLink>
          <NavLink to="/forum">FAQ</NavLink>
          <NavLink to="/joinourteam">JOIN OUR TEAM</NavLink>
          <NavLink to="/getstarted">GET STARTED</NavLink>
          <NavLink to="/termsandconditions">TERMS & CONDITIONS</NavLink>
        </List>
      </Center>
      <Right>
        <Title>Contact Us</Title>
        <Contact>
          <MapPin size={32} style={{ marginRight: "10px" }} />
          CENTRAL PLAZA 298 TIONG BAHRU ROAD #12-01, SINGAPORE 168730
        </Contact>
        <Contact>
          <Phone size={32} style={{ marginRight: "10px" }} /> +65 6319 4388
        </Contact>
        <Contact>
          <Envelope size={32} style={{ marginRight: "10px" }} />
          energym_fitness@hotmail.com
        </Contact>
        <Payment src="https://www.motoworld.com.sg/catalog/view/theme/motoworld/image/eway_cards.png" />
      </Right>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 70px;
  ${mobile({ padding: "35px", flexDirection: "column", textAlign: "center" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Image = styled.img`
  height: 70px;
  width: auto;
  margin-right: 10px;
`;

const Logo = styled.div`
  display: flex;
`;

const Logotitle = styled.h1``;

const Desc = styled.p``;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const NavLink = styled(Link)`
  width: 50%;
  margin-bottom: 10px;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: #6bbbb4;
  }
  
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const Contact = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;

export default footer;
