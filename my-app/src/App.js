import { Routes, Route } from "react-router-dom";
import './App.css'
import Login from "./pages/Login";
import Accepted from "./pages/Accepted-Application";
import AddCommittee from "./pages/Add-New-Committee-Member";
import AddFaculty from "./pages/Add-Faculty-Member";
import AddStudent from "./pages/Add-Student";
import Add_Budget from "./pages/Budget-Add";
import AdminApp from './pages/Admin-ViewApplication'
import AdminDashboard from "./pages/Admin-Dashboard";
import AdminViewAppList from './pages/Admin-ViewApplication-List'
import AfterLogin from "./pages/AfterLogin";
import AssignGrader from "./pages/Assign-Graders";
import AddSession from "./pages/Add-Session";
import AllocationSheet from "./pages/Allocation-Sheet";
import Budget from "./pages/Budget";
import Committee from "./pages/Committee-Members";
import Com from './pages/Committee-Dashboard';
import Faculty from "./pages/Faculty-Members";
import FacultyDash from './pages/Faculty-Dashboard'
import Help from "./pages/Help";
import MeritCriteria from "./pages/Meritbase-Criteria"; // Correct import
import Meritbase from "./pages/Merit-Base-Short-Listing";
import NeedCriteria from "./pages/Needbase-Criteria"; // Correct import
import Needbase from "./pages/NeedbaseApplication";
import PersonalDetails from "./pages/PersonalDetails";
import Policies from "./pages/Policies";
import Rejected from "./pages/Rejected-Application";
import StudentDashboard from "./pages/StudentDashboard";
import StudentRecords from "./pages/Student-Record";
import UpdatePassword from './pages/Update-Password'
import ViewApplication from './pages/View-Application'
import AddPolicies from "./pages/NewPolicies";
import MeritBaseRejected from "./pages/Meritbase-Rejected";

function App() {
  return (
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/Accepted-Application" element={<Accepted />} />
        <Route path="/Add-New-Committee-Member" element={<AddCommittee />} />
        <Route path="/Add-Faculty-Member" element={<AddFaculty />} />
        <Route path="/Add-Student" element={<AddStudent />} />
        <Route path="/Admin-ViewApplication" element={<AdminApp />} />
        <Route path="/Admin-Dashboard" element={<AdminDashboard />} />
        <Route path="/Admin-ViewApplication-List" element={<AdminViewAppList />} />
        <Route path="/AfterLogin" element={<AfterLogin />} />
        <Route path="/Assign-Graders" element={<AssignGrader />} />
        <Route path="/Allocation-Sheet" element={<AllocationSheet />} />
        <Route path="/Add-Session" element={<AddSession />} />
        <Route path="/Budget" element={<Budget />} />
        <Route path="/Budget-Add" element={<Add_Budget />} />
        <Route path="/Committee-Members" element={<Committee />} />
        <Route path="/Committee-Dashboard" element={<Com />} />
        <Route path="/Faculty-Members" element={<Faculty />} />
        <Route path="/Faculty-Dashboard" element={<FacultyDash />} />
        <Route path="/Help" element={<Help />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Meritbase-Criteria" element={<MeritCriteria />} /> {/* Correct path */}
        <Route path="/Merit-Base-Short-Listing" element={<Meritbase />} />
        <Route path="/Needbase-Criteria" element={<NeedCriteria />} /> {/* Correct path */}
        <Route path="/NeedbaseApplication" element={<Needbase />} />
        <Route path="/PersonalDetails" element={<PersonalDetails />} />
        <Route path="/Policies" element={<Policies />} />
        <Route path="/Rejected-Application" element={<Rejected />} />
        <Route path="/StudentDashboard" element={<StudentDashboard />} />
        <Route path="/Student-Record" element={<StudentRecords />} />
        <Route path="/Update-Password" element={<UpdatePassword />} />
        <Route path="/View-Application" element={<ViewApplication />} />
        <Route path="/NewPolicies" element={<AddPolicies />} />
        <Route path="/Meritbase-Rejected" element={<MeritBaseRejected />} />
      </Routes>
  );
}

export default App;
