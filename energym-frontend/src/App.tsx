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
import Register from "./components/user/userregisterform";
import Login from "./components/user/userloginform";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import ScrollToTop from "./components/scrolltotop";
import { authapi, authapiToken } from "./api/auth";
import axios from "axios";
import { BASE_URL, LOCAL_URL } from "./api/api";

axios.defaults.baseURL = LOCAL_URL.LOCALAUTH;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
})


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
 
`;

export default App;
