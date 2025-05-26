import { IAdminService } from "./interface/IAdminService";
import { IAdmin } from "../models/adminModel";
import { IAdminRepository } from "src/repositories/interfaces/IAdminRepository";

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
}