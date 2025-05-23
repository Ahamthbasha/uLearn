import { IUser } from "../../models/userModel";

export default interface IStudentService {
    findByEmail(email: string):Promise<IUser | null>;
    createUser(userData:IUser):Promise<IUser | null>
}