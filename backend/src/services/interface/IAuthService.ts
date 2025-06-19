// src/services/interface/IAuthService.ts
export interface IAuthService {
  isStudentBlocked(email: string): Promise<boolean>;
}
