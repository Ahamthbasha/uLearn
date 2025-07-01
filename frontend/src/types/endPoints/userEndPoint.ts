const UserRouterEndpoints = {
    userProfilePage: '/api/student/profile',
    userUpdateProfile: '/api/student/profile',
    userUpdatePassWord: '/api/student/profile/password',

    //userCourseList

    userCourseList:'/api/student/courses',
    userCourseDetail:'/api/student/courses',
    userCourseFilter:'/api/student/courses/filter',

    //userCategories
    userGetAllCategories:'/api/student/categories',

    //userCart
    userGetCart: '/api/student/cart',
    userAddToCart: '/api/student/addToCart',
    userRemoveCourseFromCart: '/api/student/remove',
    userClearCart: '/api/student/clearCart',

}

export default UserRouterEndpoints