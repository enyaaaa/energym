import React from "react";
import styled from "styled-components";
import energymvideo from "../assets/video/energym.mp4";

type Props = {};

const banner = (props: Props) => {
  return (
    <Container>
      <video controls width="100%" loop autoPlay muted>
        <source src={energymvideo} type="video/mp4" />
      </video>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 2%;
  padding-left: 10%;
  padding-right: 10%;
  align-items: center;
`;

export default banner;
