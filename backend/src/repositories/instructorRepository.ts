import InstructorModel, { IInstructor, IInstructorDTO } from "../models/instructorModel";
import { GenericRepository } from "./genericRepository";
import IInstructorRepository from "./interfaces/IInstructorRepository";
import { InstructorErrorMessages } from "../utils/constants";

export default class InstructorRepository extends GenericRepository<IInstructor> implements IInstructorRepository{
    constructor(){
        super(InstructorModel)
    }

    async findByEmail(email: string): Promise<IInstructor | null> {
        return await this.findOne({email})
    }

    async createUser(userData:IInstructorDTO): Promise<IInstructor | null> {
        return await this.create(userData)
    }

    async resetPassword(email: string, password: string): Promise<IInstructor | null> {
        try {
            const instructor = await this.findOne({email})

            if(!instructor){
                throw new Error(InstructorErrorMessages.USER_NOT_FOUND)
            }

            const instructorId = instructor._id as unknown as string

            return await this.update(instructorId,{password})
        } catch (error) {
            throw error
        }
    }

    async googleLogin(name: string, email: string, password: string): Promise<IInstructor | null> {
        try {
            const instructor = await this.findByEmail(email)

            const username = name

            if(!instructor){
                const newInstructor = await this.createUser({username,email,password})

                return newInstructor
            }

            return instructor
        } catch (error) {
            throw error
        }
    }
}