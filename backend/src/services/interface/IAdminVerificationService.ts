import { IVerificationModel } from "../../models/verificationModel";

export interface IAdminVerificationService {
  getAllRequests(): Promise<IVerificationModel[] | null>;

  getRequestDataByEmail(email: string): Promise<IVerificationModel | null>;
  
  approveRequest(email: string, status: string,reason?:string): Promise<IVerificationModel | null>;
}
