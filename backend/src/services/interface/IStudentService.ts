import { IUser } from "src/models/userModel";

export default interface IStudentService{
    findByEmail(email:string):Promise<IUser | null>
    createUser(userData:IUser):Promise<IUser | null>
    signup(userData : IUser):Promise<IUser | null>
}