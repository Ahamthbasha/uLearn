import { IUser } from "../../models/userModel";
import { IAdmin } from "../../models/adminModel";
import { IInstructor } from "../../models/instructorModel";
export interface IAdminRepository{

//admin login
    getAdmin(email:string):Promise<IAdmin|null>
    createAdmin(adminData:IAdmin):Promise<IAdmin|null>

//fetch users and instructors

    getAllUsers():Promise<IUser[] | null>
    getAllInstructors():Promise<IInstructor [] | null>

//get data based on email
    getUserData(email:string):Promise<IUser | null>
    getInstructorData(email:string):Promise<IInstructor | null>

//block and ublock 
    updateProfile(email:String,data:any):Promise<any>
    updateInstructorProfile(email:string,data:any):Promise<any>
}