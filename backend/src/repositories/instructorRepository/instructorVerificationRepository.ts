import { IVerificationModel } from "../../models/verificationModel";
import { GenericRepository } from "../genericRepository";
import VerificationModel from "../../models/verificationModel";
import { updateRequestType } from "../../types/types";
import { IInstructorVerificationRepository } from "../interfaces/IInstructorVerifcationRepository";
import { InstructorErrorMessages } from "../../utils/constants";

export class InstructorVerificationRepository extends GenericRepository<IVerificationModel> implements IInstructorVerificationRepository {
    constructor() {
        super(VerificationModel);
    }

    async sendVerifyRequest(username: string, email: string, degreeCertificateUrl: string, resumeUrl: string, status: string): Promise<IVerificationModel | null> {
        try {
            return await this.create({ username, email, degreeCertificateUrl, resumeUrl, status });
        } catch (error) {
            throw error;
        }
    }

    async updateRequest(email: string, data: updateRequestType): Promise<IVerificationModel | null> {
        try {
            const instructor = await this.findOne({ email });
            if (!instructor) throw new Error(InstructorErrorMessages.INSTRUCTOR_NOT_FOUND);

            const instructorId = instructor._id as unknown as string;
            return await this.update(instructorId, data);
        } catch (error) {
            throw error;
        }
    }
}