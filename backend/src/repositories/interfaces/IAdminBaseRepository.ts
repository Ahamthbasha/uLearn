import { IUser } from "../../models/userModel";
import { IInstructor } from "../../models/instructorModel";

export interface IAdminBaseRepository{

//get all data
    getAllUsers():Promise<IUser[] | null>
    getAllInstructors():Promise<IInstructor[] | null>

//get data based on email
    getUserData(email:string):Promise<IUser | null>
    getInstructorData(email:string):Promise<IInstructor | null>

//block and unblock
    updateProfile(email:string,data:any):Promise<any>
    updateInstructorProfile(email:string,data:any):Promise<any>

    
}