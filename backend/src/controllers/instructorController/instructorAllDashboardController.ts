import { Response } from "express";
import { Types } from "mongoose";
import { IInstructorAllDashboardController } from "./interfaces/IInstructorAllDashboardController";
import { IInstructorAllCourseDashboardService } from "../../services/interface/IInstructorAllDashboardService";
import { AuthenticatedRequest } from "src/middlewares/AuthenticatedRoutes";
import { getPresignedUrl } from "../../utils/getPresignedUrl"; // ✅ Adjust path as needed
import { ITopSellingCourse } from "../../types/dashboardTypes";

export class InstructorAllCourseDashboardController implements IInstructorAllDashboardController {
  private service: IInstructorAllCourseDashboardService;

  constructor(service: IInstructorAllCourseDashboardService) {
    this.service = service;
  }

  async getDashboard(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const instructorId = req.user?.id;

      if (!instructorId) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }

      const instructorObjectId = new Types.ObjectId(instructorId);
      const data = await this.service.getInstructorDashboard(instructorObjectId);

      // ✅ Override thumbnail URLs with pre-signed URLs
      const topCoursesWithUrls = await Promise.all(
        data.topCourses.map(async (course:ITopSellingCourse) => {
          const signedUrl = await getPresignedUrl(course.thumbnailUrl); // Replace with actual method
          return {
            ...course,
            thumbnailUrl: signedUrl,
          };
        })
      );

      // ✅ Replace original with signed version
      const updatedData = {
        ...data,
        topCourses: topCoursesWithUrls,
      };

      res.status(200).json({ success: true, data: updatedData });
    } catch (error: unknown) {
      console.error("Dashboard Error:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
}
