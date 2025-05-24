import { IInstructor } from "../../models/instructorModel";
import {IGenericRepository } from "../genericRepository";

export default interface IInstructorRepository extends IGenericRepository<IInstructor>{
    findByEmail(email:string):Promise<IInstructor | null>
    createUser(userData:IInstructor):Promise<IInstructor | null>
}