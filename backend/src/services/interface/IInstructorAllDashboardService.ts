import { Types } from "mongoose";

export interface IInstructorAllCourseDashboardService {
  getInstructorDashboard(instructorId: Types.ObjectId): Promise<any>;
}
