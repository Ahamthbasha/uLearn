import { Router } from "express";
import { instructorController,instructorVerificationController } from "../config/dependencyInjector";
import upload from "../utils/multer";


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

const instructorRoutes = router

export default instructorRoutes