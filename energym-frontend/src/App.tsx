import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Home from "./layout/home";
import Booking from "./layout/booking";
import Team from "./layout/team";
import Forum from "./layout/forum";
import Profile from "./layout/profile";
import Joinourteam from "./layout/joinourteam";
import Getstarted from "./layout/getstarted";
import Termsandconditions from "./layout/termsandconditions";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

function App() {
  return (
    <Container>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ourclass" element={<Booking />} />
        <Route path="/ourteam" element={<Team />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/joinourteam" element={<Joinourteam />} />
        <Route path="/getstarted" element={<Getstarted />} />
        <Route path="/termsandconditions" element={<Termsandconditions />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
    background-color: black;
`;

export default App;
