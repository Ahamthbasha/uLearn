import { Router } from "express";
import { instructorController } from "../config/dependencyInjector";

let router = Router()

router.post("/signUp",instructorController.signUp.bind(instructorController))

router.post("/resendOtp",instructorController.resendOtp.bind(instructorController))

router.post("/createUser",instructorController.createUser.bind(instructorController))

router.post("/login",instructorController.login.bind(instructorController))

router.post("/logout",instructorController.logout.bind(instructorController))

const instructorRoutes = router
export default instructorRoutes