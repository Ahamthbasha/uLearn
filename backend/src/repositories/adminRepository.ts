import { IAdminRepository } from "./interfaces/IAdminRepository";

import AdminModel, { IAdmin } from "../models/adminModel";
import { GenericRepository } from "./genericRepository";

export class AdminRespository extends GenericRepository<IAdmin> implements IAdminRepository{
    constructor(){
        super(AdminModel)
    }

    async getAdmin(email: string): Promise<IAdmin | null> {
        return await this.findOne({email})
    }

    async createAdmin(adminData: IAdmin): Promise<IAdmin | null> {
        return await this.create(adminData)
    }
}