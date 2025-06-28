const AdminRoutersEndPoints = {
//user block or unblock
    adminGetUsers : '/api/admin/getAllUsers',
    adminBlockUser : '/api/admin/blockUser',
//instructor block or unblock
    adminGetInstructors : '/api/admin/getAllInstructors',
    adminBlockInstructor : '/api/admin/blockInstructor',
//verification
    adminGetVerifcationsRequest : '/api/admin/requests',
    adminGetVerificationByEamil : '/api/admin/request',
    adminApproveVerification : '/api/admin/approveRequest',
//category 
    adminGetAllCategories : '/api/admin/categories',
    adminGetCategoryById : '/api/admin/category',
    adminListOrUnListCategory : '/api/admin/categoryListOrUnList',
    adminCreateCategory : '/api/admin/category',
    adminEditCategory : '/api/admin/category',

//course
    adminGetCourses : '/api/admin/courses',
    adminToggleList : '/api/admin/courses'
}

export default AdminRoutersEndPoints