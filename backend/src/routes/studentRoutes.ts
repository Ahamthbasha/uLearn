import { Router } from "express";
import { 
    studentController,
    studentProfileController,
    studentCourseController,
    categoryReadOnlyController,
    studentCartController
 } from "../config/dependencyInjector";
import upload from "../utils/multer";
import authenticateToken from "../middlewares/AuthenticatedRoutes";
import { isStudent } from "../middlewares/roleAuth";

const router = Router();

router.post("/signUp", studentController.studentSignUp.bind(studentController));

router.post("/resendOtp",studentController.resendOtp.bind(studentController))

router.post("/createUser",studentController.createUser.bind(studentController))

router.post("/login",studentController.login.bind(studentController))

router.post("/logout",studentController.logout.bind(studentController))

router.post('/verifyEmail',studentController.verifyEmail.bind(studentController))

router.post('/verifyResetOtp',studentController.verifyResetOtp.bind(studentController))

router.post('/forgotResendOtp',studentController.forgotResendOtp.bind(studentController))

router.post('/resetPassword',studentController.resetPassword.bind(studentController))

router.post('/googleLogin',studentController.doGoogleLogin.bind(studentController))

//isBlocked checker
router.get("/statusCheck", studentController.statusCheck.bind(studentController));



/////////////////////student profile controller/////////////////////////////////

router.get('/profile',authenticateToken,isStudent,studentProfileController.getProfile.bind(studentProfileController))

router.put('/profile',authenticateToken,isStudent,upload.single("profilePic"),studentProfileController.updateProfile.bind(studentProfileController))

router.put('/profile/password',authenticateToken,isStudent,studentProfileController.updatePassword.bind(studentProfileController))

////////////////////////student side course listing///////////////////////////////////////

router.get('/courses',studentCourseController.getAllCourses.bind(studentCourseController))

router.get('/courses/filter',studentCourseController.getFilteredCourses.bind(studentCourseController))

router.get('/courses/:courseId',studentCourseController.getCourseDetails.bind(studentCourseController))
//readCategory

router.get('/categories',categoryReadOnlyController.getAllCategories.bind(categoryReadOnlyController))

/////////////////////cart management/////////////////////////////////////

router.get("/cart",authenticateToken,isStudent,studentCartController.getCart.bind(studentCartController))

router.post('/addToCart',authenticateToken,isStudent,studentCartController.addToCart.bind(studentCartController))

router.delete('/remove/:courseId',authenticateToken,isStudent,studentCartController.removeFromCart.bind(studentCartController))

router.delete("/clearCart",authenticateToken,isStudent,studentCartController.clearCart.bind(studentCartController))


export default router;