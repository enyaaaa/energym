import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Home from "./layout/home";
import Classes from "./layout/classes";
import ClassesCategory from "./layout/classescategory";
import Team from "./layout/team";
import Forum from "./layout/forum";
import Profile from "./layout/profile";
import Joinourteam from "./layout/joinourteam";
import Getstarted from "./layout/getstarted";
import Termsandconditions from "./layout/termsandconditions";
import Register from "./layout/register";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Login from "./components/login";

import ScrollToTop from "./components/scrolltotop";

function App() {
  return (
    <Container>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ourclass" element={<Classes />} />
        <Route path="/ourclass/:category" element={<ClassesCategory />} />
        <Route path="/ourteam" element={<Team />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/joinourteam" element={<Joinourteam />} />
        <Route path="/getstarted" element={<Getstarted />} />
        <Route path="/termsandconditions" element={<Termsandconditions />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
`;

export default App;
