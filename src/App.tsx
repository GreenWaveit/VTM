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
import QuestionBankManagement from "./components/QuestionBankManagement";
import QuestionsList from "./components/QuestionBankManagement/List";
import CreateTest from "./components/Assessment/Create";
import TestResults from "./components/Results/index";
import AssignTest from "./components/Assessment/Assign";
import TestList from "./components/List/TestList";
import StudentReport from "./components/StudentWiseReport";

const App = () => {
  const studentData = {
    Physics: [
      {
        name: "Units and Dimensions",
        marks: 40,
        rank: 22,
        classAverage: 48.97,
      },
      {
        name: "Vectors & Kinematics",
        marks: 60,
        rank: 4,
        classAverage: 41.88,
      },
      {
        name: "Laws of Motion",
        marks: 55,
        rank: 3,
        classAverage: 58,
      },
    ],
    Maths: [
      {
        name: "Algebra",
        marks: 70,
        rank: 5,
        classAverage: 65.5,
      },
      {
        name: "Calculus",
        marks: 80,
        rank: 2,
        classAverage: 72.3,
      },
      {
        name: "Geometry",
        marks: 60,
        rank: 10,
        classAverage: 55.4,
      },
    ],
    Chemistry: [
      {
        name: "Chemical Bonding",
        marks: 75,
        rank: 8,
        classAverage: 70.2,
      },
      {
        name: "Thermodynamics",
        marks: 65,
        rank: 12,
        classAverage: 66.5,
      },
      {
        name: "Equilibrium",
        marks: 85,
        rank: 1,
        classAverage: 80.0,
      },
    ],
  };

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
        <Route
          path="/question-bank-management"
          element={<QuestionBankManagement />}
        />
        <Route path="/question-list" element={<QuestionsList />} />
        <Route path="/create-test" element={<CreateTest />} />
        <Route path="/test-lists" element={<TestList />} />
        <Route path="/assign-test" element={<AssignTest />} />
        <Route path="/test-results" element={<TestResults />} />
        <Route
          path="/student-wise-reports/:studentName"
          element={
            <StudentReport
              subjects={studentData} // Pass the entire data object
            />
          }
        />
      </Routes>

      {/* <Footer /> */}
    </Router>
  );
};

export default App;
