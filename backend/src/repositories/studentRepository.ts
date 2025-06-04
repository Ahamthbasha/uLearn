import { StudentErrorMessages } from "../utils/constants";
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

    async resetPasswrod(email: string, password: string): Promise<IUser | null> {
        try {
            const student = await this.findOne({email})

            if(!student){
                throw new Error(StudentErrorMessages.USER_NOT_FOUND)
            }

            const studentId = student._id as unknown as string

            const response = await this.update(studentId,{password})

            return response
        } catch (error) {
            throw error
        }
    }

    async googleLogin(name: string, email: string, password: string): Promise<IUser | null> {
        const user = await this.findByEmail(email)
        const username = name
        if(!user){
           const newUser = await this.createUser({username,email,password})
           return newUser
        }

        return user
    }
}