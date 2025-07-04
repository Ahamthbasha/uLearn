import { Types } from "mongoose";

export interface IInstructorAllCourseDashboardRepository {
  getTopSellingCourses(instructorId: Types.ObjectId): Promise<any[]>;
  getCategoryWiseSales(instructorId: Types.ObjectId): Promise<any[]>;
  getMonthlySalesGraph(instructorId: Types.ObjectId): Promise<any[]>;
  getTotalRevenue(instructorId: Types.ObjectId): Promise<number>;
  getTotalCourseSales(instructorId: Types.ObjectId): Promise<number>;
}
