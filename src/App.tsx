import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentRegister from "./components/Register/StudentRegister";
import FacultyRegister from "./components/Register/FacultyRegister";
import CollageRegister from "./components/Register/CollegeRegister";
import Navbar from "./common/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";
import Subject from "./components/Manage/Subject";
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-register" element={<StudentRegister />} />
        <Route path="/faculty-register" element={<FacultyRegister />} />
        <Route path="/college-register" element={<CollageRegister />} />
        <Route path="/manage-subjects" element={<Subject />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
