import { Router } from "express";
import { adminController } from "../config/dependencyInjector";
import authenticateToken from "../middlewares/AuthenticatedRoutes";

import { isAdmin } from "../middlewares/roleAuth";

let router = Router()

router.post("/login",adminController.login.bind(adminController))
router.post("/logout",adminController.logout.bind(adminController))

router.get("/getAllUsers",authenticateToken,isAdmin,adminController.getAllUsers.bind(adminController))

router.get("/getAllInstructors",authenticateToken,isAdmin,adminController.getAllInstructors.bind(adminController))

const adminRoutes = router

export default adminRoutes