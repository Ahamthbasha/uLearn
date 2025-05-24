import { Router } from "express";
import { studentController } from "../config/dependencyInjector";

const router = Router();

router.post("/signUp", studentController.studentSignUp.bind(studentController));

router.post("/resendOtp",studentController.resendOtp.bind(studentController))

router.post("/createUser",studentController.createUser.bind(studentController))

router.post("/login",studentController.login.bind(studentController))

router.post("/logout",studentController.logout.bind(studentController))

export default router;