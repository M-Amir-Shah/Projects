const baseUrl = "http://192.168.1.114/Backend/";

const EndPoint = {
    login: `${baseUrl}api/User/Login`,
    switchRole: `${baseUrl}api/User/SwitchRole`,

    getStudentInfo: `${baseUrl}api/Student/getStudentInfo`,
    checkApplicationStatus: `${baseUrl}api/Student/getStudentApplicationStatus`,
    sendApplication: `${baseUrl}api/Student/sendApplication`,
    updateProfileImage: `${baseUrl}api/Student/UpdateProfileImage`,

    imageUrl: `${baseUrl}Content/profileImages/`,
    houseAgreement: `${baseUrl}Content/HouseAgreement/`,
    salarySlip: `${baseUrl}Content/SalarySlip/`,
    deathCertificate: `${baseUrl}Content/DeathCertificates/`,

    getApplication: `${baseUrl}api/Committee/GetApplication`,
    committeeMemberInfo: `${baseUrl}api/Committee/CommitteeMembers`,
    giveSuggestion: `${baseUrl}api/Committee/GiveSuggestion`,
    getBalance: `${baseUrl}api/Committee/GetBalance`,

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
    adminApplication: `${baseUrl}api/Admin/ApplicationSuggestions`,
    acceptApplication: `${baseUrl}api/Admin/AcceptApplication`,
    rejectApplication: `${baseUrl}api/Admin/RejectApplication`,
    accepted: `${baseUrl}api/Admin/AcceptedApplication`,
    rejected: `${baseUrl}api/Admin/RejectedApplication`,
    assignGrader: `${baseUrl}api/Admin/AssignGrader`,
    meritBaseShortListing: `${baseUrl}api/Admin/GetMeritBaseShortListedStudent`,
    addStudent: `${baseUrl}api/Admin/AddStudent`,
    addPolicies: `${baseUrl}api/Admin/AddPolicies`,
    getPolicies: `${baseUrl}api/Admin/getPolicies`,
    unAssignedStudents: `${baseUrl}api/Admin/unAssignedGraders`,
    budgethistory: `${baseUrl}api/Admin/BudgetHistory`,
    getGraderInfo: `${baseUrl}api/Admin/gradersInformation`,
    getMeritBaseShortListedStudent: `${baseUrl}api/Admin/GetMeritBaseShortListedStudent`,
    addSession : `${baseUrl}api/Admin/AddSession`,
    getGiveRating : `${baseUrl}api/Admin/GiveRating`,
    meritbase : `${baseUrl}api/Admin/MeritBase`,
    addUser : `${baseUrl}api/Admin/AddUser`,
};

export default EndPoint;
