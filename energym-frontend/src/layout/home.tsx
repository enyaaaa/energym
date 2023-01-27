import React from "react";
import styled from "styled-components";
import Banner from "../components/banner";

type Props = {};

const home = (props: Props) => {
  return (
    <Container>
      <Banner />
    </Container>
  );
};

const Container = styled.div`

`;

export default home;
