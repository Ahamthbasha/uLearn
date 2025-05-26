const authenticationRoutes = {

    //studentRoutes
    studentSignUp : "/api/auth/student/signUp",
    studentResendOtp:"/api/auth/student/resendOtp",
    studentCreateUser:"/api/auth/student/createUser",
    studentLogin:"/api/auth/student/login",
    studentLogout:"/api/auth/student/logout",

    //instructorRoutes

    instructorSignUp:"/api/auth/instructor/signUp",
    instructorResendOtp:"/api/auth/instructor/resendOtp",
    instructorCreateUser:"/api/auth/instructor/createUser",
    instructorLogin:"/api/auth/instructor/login",
    instructorLogout:"/api/auth/instructor/logout",

    //adminRoutes

    adminLogin:"/api/auth/admin/login",
    adminLogout:"/api/auth/admin/logout"

}

export default authenticationRoutes