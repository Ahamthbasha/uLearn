import { IInstructor } from "../models/instructorModel";
import IInstructorRepository from "../repositories/interfaces/IInstructorRepository";
import IInstructorService from "./interface/IInstructorService";

export default class InstructorService implements IInstructorService{
    private instructorRepository : IInstructorRepository

    constructor(instructorRepository:IInstructorRepository){
        this.instructorRepository = instructorRepository
    }

    async findByEmail(email: string): Promise<IInstructor | null> {
        return this.instructorRepository.findByEmail(email)
    }

    async createUser(userData:IInstructor): Promise<IInstructor | null> {
        return this.instructorRepository.createUser(userData)
    }
}