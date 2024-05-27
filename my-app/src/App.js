import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import AfterLogin from "./pages/AfterLogin";
import NeedCriteria from "./pages/Needbase-Criteria"; // Correct import
import MeritCriteria from "./pages/Meritbase-Criteria"; // Correct import
import Help from "./pages/Help";
import PersonalDetails from "./pages/PersonalDetails";
import AdminDashboard from "./pages/Admin-Dashboard";
import Meritbase from "./pages/Merit-Base-Short-Listing";
import Needbase from "./pages/NeedbaseApplication";
import Accepted from "./pages/Accepted-Application";
import Rejected from "./pages/Rejected-Application";
import Committee from "./pages/Committee-Members";
import AddCommittee from "./pages/Add-New-Committee-Member";
import Faculty from "./pages/Faculty-Members";
import AddFaculty from "./pages/Add-Faculty-Member";
import AssignGrader from "./pages/Assign-Graders";
import Budget from "./pages/Budget";
import Add_Budget from "./pages/Budget-Add";
import AddStudent from "./pages/Add-Student";
import Policies from "./pages/Policies";
import AddPolicies from "./pages/NewPolicies";
import Com from './pages/Committee-Dashboard';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/StudentDashboard" element={<StudentDashboard />} />
        <Route path="/AfterLogin" element={<AfterLogin />} />
        <Route path="/Needbase-Criteria" element={<NeedCriteria />} /> {/* Correct path */}
        <Route path="/Meritbase-Criteria" element={<MeritCriteria />} /> {/* Correct path */}
        <Route path="/Help" element={<Help />} />
        <Route path="/PersonalDetails" element={<PersonalDetails />} />
        <Route path="/Admin-Dashboard" element={<AdminDashboard />} />
        <Route path="/Merit-Base-Short-Listing" element={<Meritbase />} />
        <Route path="/NeedbaseApplication" element={<Needbase />} />
        <Route path="/Accepted-Application" element={<Accepted />} />
        <Route path="/Rejected-Application" element={<Rejected />} />
        <Route path="/Committee-Members" element={<Committee />} />
        <Route path="/Add-New-Committee-Member" element={<AddCommittee />} />
        <Route path="/Committee-Dashboard" element={<Com />} />
        <Route path="/Faculty-Members" element={<Faculty />} />
        <Route path="/Add-Faculty-Member" element={<AddFaculty />} />
        <Route path="/Budget" element={<Budget />} />
        <Route path="/Budget-Add" element={<Add_Budget />} />
        <Route path="/Assign-Graders" element={<AssignGrader />} />
        <Route path="/Policies" element={<Policies />} />
        <Route path="/NewPolicies" element={<AddPolicies />} />
        <Route path="/Add-Student" element={<AddStudent />} />
      </Routes>
    </div>
  );
}

export default App;
