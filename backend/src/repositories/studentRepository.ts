import { IUser } from "src/models/userModel";
import { GenericRepository } from "./genericRepository";
import { IStudentRepository } from "./interfaces/IStudentRepository";
import { Model } from "mongoose";

export class StudentRepository extends GenericRepository<IUser> implements IStudentRepository{
    constructor(model:Model<IUser>){
        super(model)
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return await this.findOne({email})
    }

    async createUser(userData: IUser): Promise<IUser | null> {
        return await this.create(userData)
    }
}