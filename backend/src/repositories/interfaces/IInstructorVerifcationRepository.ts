import { IVerificationModel } from "../../models/verificationModel";
import { updateRequestType } from "../../types/types";

export interface IInstructorVerificationRepository {
    sendVerifyRequest(username: string, email: string, degreeCertificateUrl: string, resumeUrl: string, status: string): Promise<IVerificationModel | null>;
    
    updateRequest(email: string, data: updateRequestType): Promise<IVerificationModel | null>;
}
