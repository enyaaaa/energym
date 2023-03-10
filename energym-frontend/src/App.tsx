import { Routes, Route } from "react-router-dom";
import Home from "./layout/home";
import Classes from "./layout/user/classes";
import ClassesCategory from "./layout/user/classescategory";
import Team from "./layout/team";
import Forum from "./layout/forum";
import Userprofile from "./components/user/userprofile";
import Joinourteam from "./layout/joinourteam";
import Termsandconditions from "./layout/termsandconditions";
import Register from "./components/user/userregisterform";
import Login from "./components/user/userloginform";
import Usereditprofile from "./components/user/usereditprofile";
import Userbooking from "./components/user/userbooking";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import ScrollToTop from "./components/scrolltotop";
import Instructorlogin from "./components/instructor/instructorloginform";
import Instructorregister from "./components/instructor/instructorregisterform";
import Instructorprofile from "./components/instructor/instructorprofile";
import Instructoreditprofile from "./components/instructor/instructoreditprofile";
import Classrooms from "./layout/instructor/classrooms";
import Instructorbooking from "./components/instructor/instructorbooking";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ourclass" element={<Classes />} />
        <Route path="/ourclass/:category" element={<ClassesCategory />} />
        <Route path="/ourteam" element={<Team />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/joinourteam" element={<Joinourteam />} />
        <Route path="/termsandconditions" element={<Termsandconditions />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userprofile" element={<Userprofile />} />
        <Route path="/usereditprofile" element={<Usereditprofile />} />
        <Route path="/yourclassbookings" element={<Userbooking />} />

        <Route path="/instructorlogin" element={<Instructorlogin />} />
        <Route path="/instructorregister" element={<Instructorregister />} />
        <Route path="/instructorprofile" element={<Instructorprofile />} />
        <Route
          path="/instructoreditprofile"
          element={<Instructoreditprofile />}
        />
        <Route path="/classrooms" element={<Classrooms />} />
        <Route path="/yourstudiobookings" element={<Instructorbooking />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
