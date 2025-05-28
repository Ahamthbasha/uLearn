const authenticationRoutes = {

    //studentRoutes
    studentSignUp : "/api/student/signUp",
    studentResendOtp:"/api/student/resendOtp",
    studentVerifyOtp:"/api/student/createUser",
    studentLogin:"/api/student/login",
    studentLogout:"/api/student/logout",

    //instructorRoutes

    instructorSignUp:"/api/instructor/signUp",
    instructorResendOtp:"/api/instructor/resendOtp",
    instructorVerifyOtp:"/api/instructor/createUser",
    instructorLogin:"/api/instructor/login",
    instructorLogout:"/api/instructor/logout",

    //adminRoutes

    adminLogin:"/api/admin/login",
    adminLogout:"/api/admin/logout"

}

export default authenticationRoutes