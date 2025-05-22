import express from 'express'
import { StudentController } from '../controllers/studentControllers/studentController'
import { StudentRepository } from '../repositories/studentRepository'
import UserModel from '../models/userModel'
import { StudentServices } from '../services/studentService'

const router = express.Router()

const studentRepository = new StudentRepository(UserModel)
const studentService = new StudentServices(studentRepository)
const studentController = new StudentController(studentService)

router.post("/signup",(req,res)=>studentController.studentSignUp(req,res))

export default router