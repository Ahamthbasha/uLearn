import { IAdminService } from "./interface/IAdminService";
import { IAdmin } from "../models/adminModel";
import { IAdminRepository } from "../repositories/interfaces/IAdminRepository";
import { IInstructor } from "../models/instructorModel";
import { IUser } from "../models/userModel";
export class AdminService implements IAdminService{
    private adminRepository : IAdminRepository

    constructor(adminRepository : IAdminRepository){
        this.adminRepository = adminRepository
    }

    async getAdminData(email: string): Promise<IAdmin | null> {
        return await this.adminRepository.getAdmin(email)
    }

    async createAdmin(adminData: IAdmin): Promise<IAdmin | null> {
        return await this.adminRepository.createAdmin(adminData)
    }

    async getAllUsers(): Promise<IUser[] | null> {
        return await this.adminRepository.getAllUsers()
    }

    async getAllInstructors(): Promise<IInstructor[] | null> {
        return await this.adminRepository.getAllInstructors()
    }

    async getUserData(email: string): Promise<IUser | null> {
        return this.adminRepository.getUserData(email)
    }

    async getInstructorData(email: string): Promise<IInstructor | null> {
        return await this.adminRepository.getInstructorData(email)
    }
}