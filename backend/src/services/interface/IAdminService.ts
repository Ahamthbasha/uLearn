import { IUser } from "../../models/userModel";
import { IAdmin, IAdminDTO } from "../../models/adminModel";
import { IInstructor } from "../../models/instructorModel";

export interface IAdminService{
    getAdminData(email:string):Promise<IAdmin | null>
    createAdmin(adminData:IAdminDTO):Promise<IAdmin | null>

    getAllUsers():Promise<IUser[] | null>
    getAllInstructors():Promise<IInstructor[] | null>

//specified data based on email
    getUserData(email:string):Promise<IUser | null>
    getInstructorData(email:string):Promise<IInstructor | null>

//block or unblock
    updateProfile(email:string,data:any):Promise<any>
    updateInstructorProfile(email:string,data:any):Promise<any>
}