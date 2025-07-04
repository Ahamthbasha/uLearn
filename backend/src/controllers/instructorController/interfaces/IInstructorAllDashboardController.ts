import { Request, Response } from "express";

export interface IInstructorAllDashboardController {
  getDashboard(req: Request, res: Response): Promise<void>;
}
