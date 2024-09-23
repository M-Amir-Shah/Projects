import { notification } from "antd";
import { rejects } from "assert";

const baseUrl = "http://localhost/Backend/";

const EndPoint = {
    login: `${baseUrl}api/User/Login`,
    switchRole: `${baseUrl}api/User/SwitchRole`,

    getStudentInfo: `${baseUrl}api/Student/getStudentInfo`,
    getStudentApplicationStatus: `${baseUrl}api/Student/getStudentApplicationStatus`,
    sendApplication: `${baseUrl}api/Student/sendApplication`,
    updateProfileImage: `${baseUrl}api/Student/UpdateProfileImage`,
    getSession: `${baseUrl}api/Student/getSession`,
    uploadfile: `${baseUrl}api/Student/UploadFile1`,
    getAmount:`${baseUrl}api/Student/GetAmount`,
    decidedMeritBase: `${baseUrl}api/Student/decideMeritBaseApplication`,

    imageUrl: `${baseUrl}Content/profileImages/`,
    houseAgreement: `${baseUrl}Content/HouseAgreement/`,
    salarySlip: `${baseUrl}Content/SalarySlip/`,
    deathCertificate: `${baseUrl}Content/DeathCertificates/`,

    getApplication: `${baseUrl}api/Committee/GetApplication`,
    committeeMemberInfo: `${baseUrl}api/Committee/CommitteeMembers`,
    giveSuggestion: `${baseUrl}api/Committee/GiveSuggestion`,
    getBalance: `${baseUrl}api/Committee/GetBalance`,
    committeeInfo: `${baseUrl}api/Committee/CommitteeInfo`,

    rateGraderPerformance: `${baseUrl}api/Faculty/RateGraderPerformance`,
    facultyInfo: `${baseUrl}api/Faculty/FacultyInfo`,
    teachersGraders : `${baseUrl}api/Faculty/TeachersGraders`,
    
    getAdminInfo: `${baseUrl}api/Admin/getAdminInfo`,
    getAllStudents: `${baseUrl}api/Admin/getAllStudent`,
    updatePassword: `${baseUrl}api/Admin/UpdatePassword`,
    getAllBudget: `${baseUrl}api/Admin/getAllBudget`,
    addBudget: `${baseUrl}api/Admin/AddBudget`,
    addFacultyMember: `${baseUrl}api/Admin/AddFacultyMember`,
    getFacultyMembers: `${baseUrl}api/Admin/FacultyMembers`,
    getCommitteeMembers: `${baseUrl}api/Admin/CommitteeMembers`,
    addCommitteeMember: `${baseUrl}api/Admin/AddCommitteeMember`,
    applicationSuggestions: `${baseUrl}api/Admin/ApplicationSuggestions`,
    acceptApplication: `${baseUrl}api/Admin/AcceptApplication`, //post
    rejectApplication: `${baseUrl}api/Admin/RejectApplication`, //post
    accepted: `${baseUrl}api/Admin/AcceptedApplication`, //get
    rejected: `${baseUrl}api/Admin/RejectedApplication`, //get
    meritRejected: `${baseUrl}api/Admin/MeritBaseRejectedApplication`,
    meritBaseShortListing: `${baseUrl}api/Admin/GetMeritBaseShortListedStudent`,
    addStudent: `${baseUrl}api/Admin/AddStudent`,
    addPolicies: `${baseUrl}api/Admin/AddPolicies`,
    getPolicies: `${baseUrl}api/Admin/getPolicies`,
    unAssignedStudents: `${baseUrl}api/Admin/unAssignedGraders1`,
    assignGrader: `${baseUrl}api/Admin/AssignGrader`,
    budgethistory: `${baseUrl}api/Admin/BudgetHistory`,
    getGraderInfo: `${baseUrl}api/Admin/gradersInformation`,
    addSession : `${baseUrl}api/Admin/AddSession`,
    getGiveRating : `${baseUrl}api/Admin/GiveRating`,
    meritbase : `${baseUrl}api/Admin/MeritBase`,
    addUser : `${baseUrl}api/Admin/AddUser`,
    removeGrader: `${baseUrl}api/Admin/Removegrader`,
    
    notifications: `${baseUrl}api/Faculty/GetLowFeedbackRatings`,



     
    eligibleRejection: `${baseUrl}api/Testing/GetStudentsEligibleForRejection`,
    
    
};

export default EndPoint;
