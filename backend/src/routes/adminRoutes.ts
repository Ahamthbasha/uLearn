import { Router } from "express";
import { adminController } from "../config/dependencyInjector";

let router = Router()

router.post("/login",adminController.login.bind(adminController))
router.post("/logout",adminController.logout.bind(adminController))

const adminRoutes = router

export default adminRoutes