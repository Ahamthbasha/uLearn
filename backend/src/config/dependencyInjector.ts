import { IStudentRepository } from "../repositories/interfaces/IStudentRepository";
import { StudentRepository } from "../repositories/studentRepository";
import IStudentService from "../services/interface/IStudentService";
import { StudentServices } from "../services/studentService";
import IStudentController from "../controllers/studentControllers/interfaces/IStudentController";
import { StudentController } from "../controllers/studentControllers/studentController";

import IOtpRepository from "../repositories/interfaces/IOtpRepository";
import { OtpRepository } from "../repositories/OtpRepository";

import IOtpServices from "../services/interface/IOtpService";
import { OtpService } from "../services/otpService";

const otpRepository :IOtpRepository = new OtpRepository()
const otpService : IOtpServices = new OtpService(otpRepository)

const studentRepository: IStudentRepository = new StudentRepository()
const studentService: IStudentService = new StudentServices(studentRepository)
const studentController: IStudentController = new StudentController(studentService,otpService)

export {studentController}