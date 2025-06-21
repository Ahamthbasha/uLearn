// src/services/implementation/AuthService.ts
import { IAuthService } from "../services/interface/IAuthService";
import { StudentRepository } from "../repositories/studentRepository/studentRepository";
import InstrctorRepository from '../repositories/instructorRepository/instructorRepository'
export class AuthService implements IAuthService {
  private studentRepo = new StudentRepository();
  private instructorRepo = new InstrctorRepository();

  async isStudentBlocked(email: string): Promise<boolean> {
    const student = await this.studentRepo.findByEmail(email);
    return student?.isBlocked ?? true; // Treat unknown student as blocked
  }

  async isInstructorBlocked(email:string):Promise<boolean>{
    const instructor = await this.instructorRepo.findByEmail(email)
    return instructor?.isBlocked ?? true
  }

  async getInstructorByEmail(email: string) {
     return await this.instructorRepo.findByEmail(email);
  }

}
