const InstructorRouterEndPoints = {
    instructorSendVerificationRequest :'/api/instructor/verificationRequest',
    instructorGetVerificationStatus : '/api/instructor/getVerificationByEmail',

    //profile management endpoints
    instructorProfilePage :'/api/instructor/profile',
    instructorUpdateProfile : '/api/instructor/profile',
    instructorUpdatePassword : '/api/instructor/profile/password',

    //category fetch
    instructorGetCategory : '/api/instructor/categories',

    //instructor created course fetch
    instructorGetCreatedCourses: '/api/instructor/courses',

    //course management
    instructorCreateCourse : '/api/instructor/course',
    instructorUpdateCourse : '/api/instructor/course',
    instructorDeleteCourse : '/api/instructor/course',
    instructorGetCourseById :  '/api/instructor/course',
}

export default InstructorRouterEndPoints