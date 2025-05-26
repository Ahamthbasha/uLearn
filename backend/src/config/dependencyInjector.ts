import { IStudentRepository } from "../repositories/interfaces/IStudentRepository";
import { StudentRepository } from "../repositories/studentRepository";
import IStudentService from "../services/interface/IStudentService";
import { StudentServices } from "../services/StudentService";
import IStudentController from "../controllers/studentControllers/interfaces/IStudentController";
import { StudentController } from "../controllers/studentControllers/studentController";

import IOtpRepository from "../repositories/interfaces/IOtpRepository";
import { OtpRepository } from "../repositories/OtpRepository";
import IOtpServices from "../services/interface/IOtpService";
import { OtpService } from "../services/OtpService";

import IInstructorController from "../controllers/instructorController/interfaces/IInstructorController";
import { InstructorController } from "../controllers/instructorController/InstructorController";

import IInstructorRepository from "../repositories/interfaces/IInstructorRepository";
import InstructorRepository from "../repositories/instructorRepository";

import IInstructorService from "../services/interface/IInstructorService";
import InstructorService from "../services/InstructorService";

import { IAdminRepository } from "../repositories/interfaces/IAdminRepository";
import { AdminRespository } from "../repositories/adminRepository";
import { IAdminService } from "../services/interface/IAdminService";
import { AdminService } from "../services/AdminService";
import { IAdminController } from "../controllers/adminControllers/inteface/IAdminController";
import { AdminController } from "../controllers/adminControllers/adminController";

const otpRepository :IOtpRepository = new OtpRepository()
const otpService : IOtpServices = new OtpService(otpRepository)

const studentRepository: IStudentRepository = new StudentRepository()
const studentService: IStudentService = new StudentServices(studentRepository)
const studentController: IStudentController = new StudentController(studentService,otpService)



///////INSTRUCTOR REPOSITORY//////////
const instructorRepository : IInstructorRepository = new InstructorRepository()
const instructorService : IInstructorService = new InstructorService(instructorRepository)
const instructorController : IInstructorController = new InstructorController(instructorService,otpService)



///////////////ADMIN REPOSITORY///////////

const adminRespository : IAdminRepository = new AdminRespository
const adminService : IAdminService = new AdminService(adminRespository)
const adminController:IAdminController = new AdminController(adminService)

export {studentController,instructorController,adminController}