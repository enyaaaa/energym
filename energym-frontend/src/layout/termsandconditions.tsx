import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

type Props = {};

const termsandconditions = (props: Props) => {
  return (
    <Container>
      <Wrapper>
        <Header>
          <Title>TERMS AND CONDITIONS</Title>
        </Header>
      </Wrapper>
      <Terms>
        <h2>
          <strong>Terms and Conditions</strong>
        </h2>

        <P>Welcome to energym!</P>

        <P>
          These terms and conditions outline the rules and regulations for the
          use of energym's Website, located at energym.com.
        </P>

        <P>
          By accessing this website we assume you accept these terms and
          conditions. Do not continue to use energym if you do not agree to take
          all of the terms and conditions stated on this page.
        </P>

        <P>
          The following terminology applies to these Terms and Conditions,
          Privacy Statement and Disclaimer Notice and all Agreements: "Client",
          "You" and "Your" refers to you, the person log on this website and
          compliant to the Company’s terms and conditions. "The Company",
          "Ourselves", "We", "Our" and "Us", refers to our Company. "Party",
          "Parties", or "Us", refers to both the Client and ourselves. All terms
          refer to the offer, acceptance and consideration of payment necessary
          to undertake the process of our assistance to the Client in the most
          appropriate manner for the express purpose of meeting the Client’s
          needs in respect of provision of the Company’s stated services, in
          accordance with and subject to, prevailing law of Netherlands. Any use
          of the above terminology or other words in the singular, plural,
          capitalization and/or he/she or they, are taken as interchangeable and
          therefore as referring to same.
        </P>

        <h3>
          <strong>Cookies</strong>
        </h3>

        <P>
          We employ the use of cookies. By accessing energym, you agreed to use
          cookies in agreement with the energym's Privacy Policy.{" "}
        </P>

        <P>
          Most interactive websites use cookies to let us retrieve the user’s
          details for each visit. Cookies are used by our website to enable the
          functionality of certain areas to make it easier for people visiting
          our website. Some of our affiliate/advertising partners may also use
          cookies.
        </P>

        <h3>
          <strong>License</strong>
        </h3>

        <P>
          Unless otherwise stated, energym and/or its licensors own the
          intellectual property rights for all material on energym. All
          intellectual property rights are reserved. You may access this from
          energym for your own personal use subjected to restrictions set in
          these terms and conditions.
        </P>

        <P>You must not:</P>
        <UL>
          <li>Republish material from energym</li>
          <li>Sell, rent or sub-license material from energym</li>
          <li>Reproduce, duplicate or copy material from energym</li>
          <li>Redistribute content from energym</li>
        </UL>

        <P>
          This Agreement shall begin on the date hereof. Our Terms and
          Conditions were created with the help of the{" "}
          <a href="https://www.termsandconditionsgenerator.com/">
            Free Terms and Conditions Generator
          </a>
          .
        </P>

        <P>
          Parts of this website offer an opportunity for users to post and
          exchange opinions and information in certain areas of the website.
          energym does not filter, edit, publish or review Comments prior to
          their presence on the website. Comments do not reflect the views and
          opinions of energym,its agents and/or affiliates. Comments reflect the
          views and opinions of the person who post their views and opinions. To
          the extent permitted by applicable laws, energym shall not be liable
          for the Comments or for any liability, damages or expenses caused
          and/or suffered as a result of any use of and/or posting of and/or
          appearance of the Comments on this website.
        </P>

        <P>
          energym reserves the right to monitor all Comments and to remove any
          Comments which can be considered inappropriate, offensive or causes
          breach of these Terms and Conditions.
        </P>

        <P>You warrant and represent that:</P>

        <UL>
          <li>
            You are entitled to post the Comments on our website and have all
            necessary licenses and consents to do so;
          </li>
          <li>
            The Comments do not invade any intellectual property right,
            including without limitation copyright, patent or trademark of any
            third party;
          </li>
          <li>
            The Comments do not contain any defamatory, libelous, offensive,
            indecent or otherwise unlawful material which is an invasion of
            privacy
          </li>
          <li>
            The Comments will not be used to solicit or promote business or
            custom or present commercial activities or unlawful activity.
          </li>
        </UL>

        <P>
          You hereby grant energym a non-exclusive license to use, reproduce,
          edit and authorize others to use, reproduce and edit any of your
          Comments in any and all forms, formats or media.
        </P>
      </Terms>
    </Container>
  );
};

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 30px;
  background: linear-gradient(rgba(27, 27, 27, 0.562), rgba(19, 19, 19, 0.938)),
    url("https://img.grouponcdn.com/bynder/bjvw6NoX932ZGJNw5NwRHoB1i2R/bj-2048x1229/v1/c870x524.webp")
      center;
`;

const Header = styled.div`
  padding: 50px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 80px;
  ${mobile({ fontSize: "50px" })}
`;

const Terms = styled.div`
  padding: 20px;
`;

const P = styled.p`
  padding: 20px;
`;

const UL = styled.ul`
  padding-left: 60px;
`;


export default termsandconditions;
