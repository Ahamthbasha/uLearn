import UserModel, { IUser, IUserDTO } from "../models/userModel";
import { GenericRepository } from "./genericRepository";
import { IStudentRepository } from "./interfaces/IStudentRepository";


export class StudentRepository extends GenericRepository<IUser> implements IStudentRepository {
    constructor() {
        super(UserModel); // parent class is generic repository.We call parent class constructor and give model to work with
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return await this.findOne({ email });
    }

    async createUser(userData:IUserDTO):Promise<IUser | null>{
        return await this.create(userData)
    }
}