import {IUser} from "../../models/userModel"
import { IGenericRepository } from "../genericRepository"
export interface IStudentRepository extends IGenericRepository<IUser>{
    findByEmail(email:string) : Promise<IUser | null>
    createUser(userData:IUser): Promise<IUser | null>
    resetPasswrod(email:string,password:string):Promise<IUser | null>
    googleLogin(name:string,email:string,password:string):Promise<IUser | null> 
}