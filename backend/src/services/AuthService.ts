// src/services/implementation/AuthService.ts
import { IAuthService } from "../services/interface/IAuthService";
import { StudentRepository } from "../repositories/studentRepository/studentRepository";

export class AuthService implements IAuthService {
  private studentRepo = new StudentRepository();

  async isStudentBlocked(email: string): Promise<boolean> {
    const student = await this.studentRepo.findByEmail(email);
    return student?.isBlocked ?? true; // Treat unknown student as blocked
  }
}
