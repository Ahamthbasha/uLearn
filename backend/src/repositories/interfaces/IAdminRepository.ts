import { IUser } from "../../models/userModel";
import { IAdmin } from "../../models/adminModel";
import { IInstructor } from "../../models/instructorModel";
export interface IAdminRepository{
    getAdmin(email:string):Promise<IAdmin|null>
    createAdmin(adminData:IAdmin):Promise<IAdmin|null>

    getAllUsers():Promise<IUser[] | null>
    getAllInstructors():Promise<IInstructor [] | null>

    getUserData(email:string):Promise<IUser | null>
    getInstructorData(email:string):Promise<IInstructor | null>
}