import { Router } from "express";
import { instructorController } from "../config/dependencyInjector";

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

const instructorRoutes = router
export default instructorRoutes