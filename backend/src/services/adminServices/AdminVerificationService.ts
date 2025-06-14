import { IAdminVerificationService } from "../interface/IAdminVerificationService";
import { IVerificationModel } from "../../models/verificationModel";
import { IAdminVerificationRepository } from "../../repositories/interfaces/IAdminVerificationRepository";

export class AdminVerificationService implements IAdminVerificationService {
  private verificationRepository: IAdminVerificationRepository;

  constructor(verificationRepository: IAdminVerificationRepository) {
    this.verificationRepository = verificationRepository;
  }

  async getAllRequests(): Promise<IVerificationModel[] | null> {
    return await this.verificationRepository.getAllRequests();
  }

  async getRequestDataByEmail(email: string): Promise<IVerificationModel | null> {
    return await this.verificationRepository.getRequestDataByEmail(email);
  }

  async approveRequest(email: string, status: string): Promise<IVerificationModel | null> {
    return await this.verificationRepository.approveRequest(email, status);
  }
}
