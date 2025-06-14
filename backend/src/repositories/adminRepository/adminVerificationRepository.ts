import { IVerificationModel } from "../../models/verificationModel";
import { GenericRepository } from "../genericRepository";
import VerificationModel from "../../models/verificationModel";
import { IAdminVerificationRepository } from "../interfaces/IAdminVerificationRepository";
import { InstructorErrorMessages } from "../../utils/constants";

export class AdminVerificationRepository extends GenericRepository<IVerificationModel> implements IAdminVerificationRepository {
    constructor() {
        super(VerificationModel);
    }

    async getAllRequests(): Promise<IVerificationModel[] | null> {
        try {
            return await this.findAll({});
        } catch (error) {
            throw error;
        }
    }

    async getRequestDataByEmail(email: string): Promise<IVerificationModel | null> {
        try {
            return await this.findOne({ email });
        } catch (error) {
            throw error;
        }
    }

    async approveRequest(email: string, status: string): Promise<IVerificationModel | null> {
        try {
            const instructor = await this.findOne({ email });
            if (!instructor) throw new Error(InstructorErrorMessages.INSTRUCTOR_NOT_FOUND);

            const instructorId = instructor._id as unknown as string;
            return await this.update(instructorId, { status });
        } catch (error) {
            throw error;
        }
    }
}
