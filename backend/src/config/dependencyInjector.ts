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

//////////////////////////WEEK 2///////////////////////////////////

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

///////////////////////INSTRUCTROR CATEGORY FETCH/////////////////////////////////////

import { IInstructorCategoryRepository } from "../repositories/interfaces/IInstructorCategoryRepository";
import { InstructorCategoryRepository } from "../repositories/instructorRepository/instructorCategoryRepository";


import { IInstructorCategoryService } from "../services/interface/IInstructorCategoryService";
import { InstructorCategoryService } from "../services/instructorServices/InstructorCategoryService";

import { IInstructorCategoryController } from "../controllers/instructorController/interfaces/IInstructorCategoryController";

import { InstructorCategoryController } from "../controllers/instructorController/instructorCategoryController";


const instructorCategoryRepository : IInstructorCategoryRepository = new InstructorCategoryRepository()

const instructorCategoryService : IInstructorCategoryService = new InstructorCategoryService(instructorCategoryRepository)

const instructorCategoryController : IInstructorCategoryController = new InstructorCategoryController(instructorCategoryService)


///////////////////////INSTRUCTOR CHAPTER CONTROLLER/////////////////////////////////////

import { IInstructorChapterRepository } from "../repositories/interfaces/IInstructorChapterRepository";
import { InstructorChapterRepository } from "../repositories/instructorRepository/instructorChapterRepository";


import { IInstructorChapterService } from "../services/interface/IInstructorChapterService";
import { InstructorChapterService } from "../services/instructorServices/InstructorChapterService";

import { IInstructorChapterController } from "../controllers/instructorController/interfaces/IInstructorChapterController";
import { InstructorChapterController } from "../controllers/instructorController/instructorChapterController";


const instructorChapterRepository : IInstructorChapterRepository = new InstructorChapterRepository()

const instructorChapterService : IInstructorChapterService = new InstructorChapterService(instructorChapterRepository)

const instructorChapterController : IInstructorChapterController = new InstructorChapterController(instructorChapterService)


/////////////////////////INSTRUCTOR QUIZ CONTROLLER////////////////////////////////////////////////////////////////////////////////////////////

import { IInstructorQuizRepository } from "../repositories/interfaces/IInstructorQuizRepository";
import { InstructorQuizRepository } from "../repositories/instructorRepository/instructorQuizRepository";

import { IInstructorQuizService } from "../services/interface/IInstructorQuizService";
import { InstructorQuizService } from "../services/instructorServices/InstructorQuizService";

import { IInstructorQuizController } from "../controllers/instructorController/interfaces/IInstructorQuizController";
import { InstructorQuizController } from "../controllers/instructorController/instructorQuizController";

const instructorQuizRepository : IInstructorQuizRepository = new InstructorQuizRepository()

const instructorQuizService : IInstructorQuizService = new InstructorQuizService(instructorQuizRepository)

const instructorQuizController : IInstructorQuizController = new InstructorQuizController(instructorQuizService)



//////////////////////INSTRUCTOR COURSE MANAGEMENT///////////////////////////////////////

import { IInstructorCourseRepository } from "../repositories/interfaces/IInstructorCourseRepository";
import { InstructorCourseRepository } from "../repositories/instructorRepository/instructorCourseRepository";

import { IInstructorCourseService } from "../services/interface/IInstructorCourseService";
import { InstructorCourseService } from "../services/instructorServices/InstructorCourseService";

import { IInstructorCourseController } from "../controllers/instructorController/interfaces/IInstructorCourseController";
import { InstructorCourseController} from "../controllers/instructorController/InstructorCourseController";


const instructorCourseRepository : IInstructorCourseRepository = new InstructorCourseRepository()

const instructorCourseService : IInstructorCourseService = new InstructorCourseService(instructorCourseRepository,instructorChapterRepository,instructorQuizRepository)

const instructorCourseController : IInstructorCourseController = new InstructorCourseController(instructorCourseService)

////////////////////////ADMIN COURSE CONTROLLER/////////////////////////////////////////////////////////////////////////////////////////////

import { IAdminCourseRepository } from "../repositories/interfaces/IAdminCourseRepository";
import { AdminCourseRepository } from "../repositories/adminRepository/adminCourseRepository";

import { IAdminCourseService } from "../services/interface/IAdminCourseService";
import { AdminCourseService } from "../services/adminServices/AdminCourseService";

import { IAdminCourseController } from "../controllers/adminControllers/interface/IAdminCourseControllet";
import { AdminCourseController } from "../controllers/adminControllers/adminCourseController";


const adminCourseRepository:IAdminCourseRepository= new AdminCourseRepository()

const adminCourseService : IAdminCourseService = new AdminCourseService(adminCourseRepository)

const adminCourseController : IAdminCourseController = new AdminCourseController(adminCourseService)



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
    adminCategoryController,
//instructorCategoryController
    instructorCategoryController,
//instructorCourse,chapterController
    instructorCourseController,
    instructorChapterController,
    instructorQuizController,
//adminCourse controller,
    adminCourseController
}