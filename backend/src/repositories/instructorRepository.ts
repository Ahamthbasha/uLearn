import InstructorModel, { IInstructor, IInstructorDTO } from "../models/instructorModel";
import { GenericRepository } from "./genericRepository";
import IInstructorRepository from "./interfaces/IInstructorRepository";

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
}