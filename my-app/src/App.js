import { Routes,Route } from "react-router-dom";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard"
import AfterLogin from "./pages/AfterLogin"
import Help from "./pages/Help"
import PersonalDetails from "./pages/PersonalDetails";
import AdminDashboard from "./pages/Admin-Dashboard"
import Meritbase from "./pages/Merit-Base Short-Listing"
import Needbase from"./pages/NeedbaseApplication"
import Accepted from "./pages/Accepted-Application"
import Rejected from"./pages/Rejected-Application"
import Committee from"./pages/Committee-Members"
import Com from './pages/Committee-Dashboard'
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/StudentDashboard" element={<StudentDashboard/>}/>
        <Route path="/AfterLogin" element={<AfterLogin/>}/>
        <Route path="/Help" element={<Help/>}/>
        <Route path="/PersonalDetails" element={<PersonalDetails/>}/>
        <Route path="/Admin-Dashboard" element={<AdminDashboard/>}/>
        <Route path="/Merit-Base Short-Listingt" element={<Meritbase/>}/>
        <Route path="/NeedbaseApplication" element={<Needbase/>}/>
        <Route path="/Accepted-Application" element={<Accepted/>}/>
        <Route path="/Rejected-Application" element={<Rejected/>}/>
        <Route path="/Committee-Members" element={<Committee/>}/>
        <Route path="/Committee-Dashboard" element={<Com/>}/>
      </Routes>
      </div>
  );
}
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);
export default App;









// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import Login from './pages/Login';
// import StudentDashboard from './pages/StudentDashboard';

// const App = () => {
//   return (
//     <Router>
//       <Switch>
//         <Route path="/" exact component={Login} />
//         <Route path="/dashboard" component={StudentDashboard} />
//       </Switch>
//     </Router>
//   );
// };

// export default App;
