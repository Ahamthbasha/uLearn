import { Router } from "express";
import { instructorController,instructorVerificationController,instructorProfileController,instructorCategoryController,instructorCourseController } from "../config/dependencyInjector";
import upload from "../utils/multer";

import authenticateToken from "../middlewares/AuthenticatedRoutes";
import { isInstructor } from "../middlewares/roleAuth";

let router = Router()

router.post("/signUp",instructorController.signUp.bind(instructorController))

router.post("/resendOtp",instructorController.resendOtp.bind(instructorController))

router.post("/createUser",instructorController.createUser.bind(instructorController))

router.post("/login",instructorController.login.bind(instructorController))

router.post("/logout",instructorController.logout.bind(instructorController))

router.post('/verifyEmail',instructorController.verifyEmail.bind(instructorController))

router.post('/verifyResetOtp',instructorController.verifyResetOtp.bind(instructorController))

router.post('/forgotResendOtp',instructorController.forgotResendOtp.bind(instructorController))

router.post('/resetPassword',instructorController.resetPassword.bind(instructorController))

router.post('/googleLogin',instructorController.doGoogleLogin.bind(instructorController))

//verification part
router.post('/verificationRequest',upload.fields([{name:"degreeCertificate",maxCount:1},{name:"resume",maxCount:1}]),instructorVerificationController.submitRequest.bind(instructorVerificationController))

router.get('/getVerificationByEmail/:email',instructorVerificationController.getRequestByEmail.bind(instructorVerificationController))

//isBlocked check

router.get('/statusCheck',authenticateToken,isInstructor,instructorController.statusCheck.bind(instructorController))

//profile management part

router.get("/profile",authenticateToken,isInstructor,instructorProfileController.getProfile.bind(instructorProfileController));

router.put("/profile",authenticateToken,isInstructor,upload.single("profilePic"),instructorProfileController.updateProfile.bind(instructorProfileController));

router.put("/profile/password",authenticateToken,isInstructor,instructorProfileController.updatePassword.bind(instructorProfileController));

//categoryfetch

router.get('/categories',authenticateToken,isInstructor,instructorCategoryController.getListedCategories.bind(instructorCategoryController))

// Create Course
router.post("/course",authenticateToken,isInstructor,upload.fields([{ name: "thumbnail", maxCount: 1 },{name: "demoVideos", maxCount: 1 }]),instructorCourseController.createCourse.bind(instructorCourseController));

// Update Course
router.put("/course/:courseId",authenticateToken,isInstructor,upload.fields([{ name: "thumbnail", maxCount: 1 },{ name: "demoVideos", maxCount: 1 }]),instructorCourseController.updateCourse.bind(instructorCourseController));

// Delete Course
router.delete("/course/:courseId",authenticateToken,isInstructor,instructorCourseController.deleteCourse.bind(instructorCourseController));

// Get Course By ID
router.get("/course/:courseId",authenticateToken,isInstructor,instructorCourseController.getCourseById.bind(instructorCourseController));

//instructor created courses visit

router.get("/courses",authenticateToken,isInstructor,instructorCourseController.getInstructorCourses.bind(instructorCourseController))

const instructorRoutes = router

export default instructorRoutes