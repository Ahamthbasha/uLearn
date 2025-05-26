import { IAdmin } from "../../models/adminModel";

export interface IAdminRepository{
    getAdmin(email:string):Promise<IAdmin|null>
    createAdmin(adminData:IAdmin):Promise<IAdmin|null>
}