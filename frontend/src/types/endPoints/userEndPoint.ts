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

    //userWishlist
    userGetWishlist : '/api/student/wishlist',
    userAddTowishlist : '/api/student/addToWishlist',
    userRemoveWishlist : '/api/student/removeWishlistCourse',
    userCheckCourseExistInWishlist : '/api/student/check',

    //checkout
    userInitiateCheckout : '/api/student/checkout',
    userCompleteCheckout : '/api/student/complete',

    //enroll
    userGetEnrolledCourses : '/api/student/enrolled',
    userGetSpecificEnrolledCourses :'/api/student/enrolled',
    userMarkChapterCompleted : '/api/student/enrolled/completeChapter',
    userSubmitQuiz : '/api/student/submitQuiz',
    userCheckAllChapterCompleted : '/api/student/enrollment',
    userGetCertificate:'/api/student/certificate',
}

export default UserRouterEndpoints