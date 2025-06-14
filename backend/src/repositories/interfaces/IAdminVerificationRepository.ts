import { IVerificationModel } from "../../models/verificationModel";

export interface IAdminVerificationRepository {
    getAllRequests(): Promise<IVerificationModel[] | null>;
    getRequestDataByEmail(email: string): Promise<IVerificationModel | null>;
    approveRequest(email: string, status: string): Promise<IVerificationModel | null>;
}
