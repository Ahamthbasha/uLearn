import { IStudentRepository } from "../repositories/interfaces/IStudentRepository";
import { StudentRepository } from "../repositories/studentRepository/studentRepository";
import IStudentService from "../services/interface/IStudentService";
import { StudentServices } from "../services/studentServices/StudentService";
import IStudentController from "../controllers/studentControllers/interfaces/IStudentController";
import { StudentController } from "../controllers/studentControllers/studentController";

import IOtpRepository from "../repositories/interfaces/IOtpRepository";
import { OtpRepository } from "../repositories/OtpRepository";
import IOtpServices from "../services/interface/IOtpService";
import { OtpService } from "../services/OtpService";

import IInstructorController from "../controllers/instructorController/interfaces/IInstructorController";
import { InstructorController } from "../controllers/instructorController/InstructorController";

import IInstructorRepository from "../repositories/interfaces/IInstructorRepository";
import InstructorRepository from "../repositories/instructorRepository/instructorRepository";

import IInstructorService from "../services/interface/IInstructorService";
import InstructorService from "../services/instructorServices/InstructorService";

import { IAdminRepository } from "../repositories/interfaces/IAdminRepository";
import { AdminRespository } from "../repositories/adminRepository/adminRepository";
import { IAdminService } from "../services/interface/IAdminService";
import { AdminService } from "../services/adminServices/AdminService";
import { IAdminController } from "../controllers/adminControllers/interface/IAdminController";
import { AdminController } from "../controllers/adminControllers/adminController";
import { IAdminBaseRepository } from "../repositories/interfaces/IAdminBaseRepository";
import { AdminBaseRespository } from "../repositories/adminRepository/adminBaseRepository";




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

const adminBaseRepository : IAdminBaseRepository = new AdminBaseRespository()
const adminRespository : IAdminRepository = new AdminRespository(adminBaseRepository)
const adminService : IAdminService = new AdminService(adminRespository)
const adminController:IAdminController = new AdminController(adminService)

//////////////////////admin verification //////////////////////////////////////////
import { IAdminVerificationRepository } from "../repositories/interfaces/IAdminVerificationRepository";
import { AdminVerificationRepository } from "../repositories/adminRepository/adminVerificationRepository";
import { IAdminVerificationService } from "../services/interface/IAdminVerificationService";
import { AdminVerificationService } from "../services/adminServices/AdminVerificationService";
import IAdminVerificationController from '../controllers/adminControllers/interface/IAdminVerificationController'
import { AdminVerificationController } from "../controllers/adminControllers/adminVerificationController";

const adminVerificationRepository: IAdminVerificationRepository = new AdminVerificationRepository();
const adminVerificationService: IAdminVerificationService = new AdminVerificationService(adminVerificationRepository,instructorService);
const adminVerificationController: IAdminVerificationController = new AdminVerificationController(adminVerificationService);

/////////////////////////Instructor verification/////////////////////////////////////

import { IInstructorVerificationRepository } from "../repositories/interfaces/IInstructorVerifcationRepository";
import { InstructorVerificationRepository } from "../repositories/instructorRepository/instructorVerificationRepository";
import { IInstructorVerificationService } from "../services/interface/IInstructorVerificationService";
import { InstructorVerificationService } from "../services/instructorServices/InstructorVerificationService";
import IInstructorVerificationController from "../controllers/instructorController/interfaces/IInstructorVerificationController";
import { InstructorVerificationController } from "../controllers/instructorController/instructorVerificationController";


const instructorVerificationRepository: IInstructorVerificationRepository = new InstructorVerificationRepository();
const instructorVerificationService: IInstructorVerificationService = new InstructorVerificationService(instructorVerificationRepository);
const instructorVerificationController: IInstructorVerificationController = new InstructorVerificationController(instructorVerificationService);

///////////////////////student profile controller/////////////////////////////////////////////////

import { studentProfileRepository } from "../repositories/studentRepository/studentProfileRepository";
import { IStudentProfileRepository } from "../repositories/interfaces/IStudentProfileRepository";
import { IStudentProfileService } from "../services/interface/IStudentProfileService";
import { StudentProfileService } from "../services/studentServices/StudentProfileService";
import { IStudentProfileController } from "../controllers/studentControllers/interfaces/IStudentProfileController";
import { StudentProfileController } from "../controllers/studentControllers/studentProfileController";

const studentProfileRepo : IStudentProfileRepository = new studentProfileRepository()
const studentProfileService : IStudentProfileService = new StudentProfileService(studentProfileRepo)
const studentProfileController : IStudentProfileController = new StudentProfileController(studentProfileService)

////////////////////////INSTRUCTOR PROFILE MANAGEMENT/////////////////////////////////////////////////

import { IInstructorProfileRepository } from "../repositories/interfaces/IInstructorProfileRepository";
import { InstructorProfileRepository } from "../repositories/instructorRepository/instructorProfileRepository";
import { IInstructorProfileService } from "../services/interface/IInstructorProfileService";
import { InstructorProfileService } from "../services/instructorServices/InstructorProfileService";
import { IInstructorProfileController } from "../controllers/instructorController/interfaces/IInstructorProfileController";
import { InstructorProfileController } from "../controllers/instructorController/instructorProfileController";

const instructorProfileRepo : IInstructorProfileRepository = new InstructorProfileRepository()
const instructorProfileService : IInstructorProfileService = new InstructorProfileService(instructorProfileRepo)
const instructorProfileController : IInstructorProfileController = new InstructorProfileController(instructorProfileService)

//////////////////////ADMIN CATEGORY CONTROLLER////////////////////////////////////////

import { IAdminCategoryRepository } from "../repositories/interfaces/IAdminCategoryRepository";
import { AdminCategoryRepository } from "../repositories/adminRepository/adminCateogyRepository";

import { IAdminCategoryService } from "../services/interface/IAdminCategoryService";
import { AdminCategoryService } from "../services/adminServices/AdminCategoryService";

import { IAdminCategoryController } from "../controllers/adminControllers/interface/IAdminCategoryController";
import { AdminCategoryContoller } from "../controllers/adminControllers/adminCategoryController";


const adminCategoryRepository : IAdminCategoryRepository = new AdminCategoryRepository()
const adminCategoryServie : IAdminCategoryService = new AdminCategoryService(adminCategoryRepository)

const adminCategoryController : IAdminCategoryController = new AdminCategoryContoller(adminCategoryServie)


export {
    studentController,
    instructorController,
    adminController,
//verification
    adminVerificationController,instructorVerificationController,
//profile management
    studentProfileController,
    instructorProfileController,
//adminCategoryController
    adminCategoryController
}