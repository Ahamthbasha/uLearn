import { IAdmin, IAdminDTO } from "../../models/adminModel";

export interface IAdminService{
    getAdminData(email:string):Promise<IAdmin | null>
    createAdmin(adminData:IAdminDTO):Promise<IAdmin | null>
}