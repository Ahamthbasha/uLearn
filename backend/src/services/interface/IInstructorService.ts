import { IInstructor } from "../../models/instructorModel";

export default interface IInstructorService{
    findByEmail(email:string):Promise<IInstructor | null>
    createUser(userData:IInstructor):Promise<IInstructor | null>
}