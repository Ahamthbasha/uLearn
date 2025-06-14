import { Router } from "express";
import { studentController } from "../config/dependencyInjector";

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

export default router;