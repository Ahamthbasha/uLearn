import { IUser } from "src/models/userModel";
import IStudentService from "./interface/IStudentService";
import { IStudentRepository } from "../repositories/interfaces/IStudentRepository"

export class StudentServices implements IStudentService{
    private studentRepository : IStudentRepository

    constructor(studentRepository:IStudentRepository){
        this.studentRepository = studentRepository
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return await this.studentRepository.findByEmail(email)
    }

    async createUser(userData: IUser): Promise<IUser | null> {
        return await this.studentRepository.createUser(userData)
    }

    async signup(userData:IUser):Promise<IUser>{
        const existingUser = await this.findByEmail(userData.email)

        if(existingUser){
            throw new Error("User already exists")
        }

        const newUser = await this.createUser(userData)

        if(!newUser){
            throw new Error("User creation failed")
        }

        return newUser
    }
}