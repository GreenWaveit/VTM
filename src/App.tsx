import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentRegister from "./components/Register/StudentRegister";
import FacultyRegister from "./components/Register/FacultyRegister";
import CollageRegister from "./components/Register/CollegeRegister";
import Navbar from "./common/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";
import Subjects from "./components/Manage/Subjects";
import Chapters from "./components/Manage/Chapters";
import Qualifications from "./components/Manage/Qualifications";
import ManageTopic from "./components/Manage/Topics";
import FacultySubjectMapping from "./components/Mapping/FacultyToSubject";
import FacultyToCollegeMapping from "./components/Mapping/FacultyToCollege";
import SelfStudy from "./components/Manage/SelfStudy";
import ListOfStudent from "./components/List/StudentList";
import ListOfCollege from "./components/List/CollegeList";
import ListOfFaculty from "./components/List/FacultyList";

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
        <Route path="/manage-subjects" element={<Subjects />} />
        <Route path="/manage-chapters" element={<Chapters />} />
        <Route path="/manage-qualifications" element={<Qualifications />} />
        <Route path="/manage-topics" element={<ManageTopic />} />
        <Route
          path="/map-faculty-subject"
          element={<FacultySubjectMapping />}
        />
        <Route
          path="/map-faculty-college"
          element={<FacultyToCollegeMapping />}
        />
        <Route path="/self-study" element={<SelfStudy />} />
        <Route path="/students-list" element={<ListOfStudent />} />
        <Route path="/college-list" element={<ListOfCollege />} />
        <Route path="/faculty-list" element={<ListOfFaculty />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
