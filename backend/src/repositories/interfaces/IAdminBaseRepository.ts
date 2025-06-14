import { IUser } from "../../models/userModel";
import { IInstructor } from "../../models/instructorModel";

export interface IAdminBaseRepository{
    getAllUsers():Promise<IUser[] | null>
    getAllInstructors():Promise<IInstructor[] | null>

    getUserData(email:string):Promise<IUser | null>
    getInstructorData(email:string):Promise<IInstructor | null>
}