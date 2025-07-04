import { Types } from "mongoose";
import { IInstructorAllCourseDashboardRepository } from "../interfaces/IInstructorAllCourseDashboardRepository";
import { IGenericRepository } from "../genericRepository";
import { IOrder } from "../../models/orderModel";
import {
  ITopSellingCourse,
  ICategorySales,
  IMonthlySales,
} from '../../types/dashboardTypes'; // path as needed

export class InstructorAllCourseDashboardRepository implements IInstructorAllCourseDashboardRepository {
    private  orderRepo: IGenericRepository<IOrder>
  constructor(orderRepo: IGenericRepository<IOrder>) {
    this.orderRepo = orderRepo
  }

  async getTopSellingCourses(instructorId: Types.ObjectId): Promise<ITopSellingCourse[]> {
    return this.orderRepo.aggregate<ITopSellingCourse>([
      { $match: { status: "SUCCESS" } },
      { $unwind: "$courses" },
      {
        $lookup: {
          from: "courses",
          localField: "courses",
          foreignField: "_id",
          as: "courseInfo",
        },
      },
      { $unwind: "$courseInfo" },
      { $match: { "courseInfo.instructorId": instructorId } },
      {
        $group: {
          _id: "$courses",
          courseName: { $first: "$courseInfo.courseName" },
          thumbnailUrl: { $first: "$courseInfo.thumbnailUrl" },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 3 },
    ]);
  }

  async getCategoryWiseSales(instructorId: Types.ObjectId): Promise<ICategorySales[]> {
    return this.orderRepo.aggregate<ICategorySales>([
      { $match: { status: "SUCCESS" } },
      { $unwind: "$courses" },
      {
        $lookup: {
          from: "courses",
          localField: "courses",
          foreignField: "_id",
          as: "courseInfo",
        },
      },
      { $unwind: "$courseInfo" },
      { $match: { "courseInfo.instructorId": instructorId } },
      {
        $group: {
          _id: "$courseInfo.category",
          totalSales: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      {
        $project: {
          categoryName: { $arrayElemAt: ["$categoryInfo.categoryName", 0] },
          totalSales: 1,
        },
      },
      { $sort: { totalSales: -1 } },
    ]);
  }

  async getMonthlySalesGraph(instructorId: Types.ObjectId): Promise<IMonthlySales[]> {
    return this.orderRepo.aggregate<IMonthlySales>([
      { $match: { status: "SUCCESS" } },
      { $unwind: "$courses" },
      {
        $lookup: {
          from: "courses",
          localField: "courses",
          foreignField: "_id",
          as: "courseInfo",
        },
      },
      { $unwind: "$courseInfo" },
      { $match: { "courseInfo.instructorId": instructorId } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalSales: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);
  }

  async getTotalRevenue(instructorId: Types.ObjectId): Promise<number> {
    const result = await this.orderRepo.aggregate([
      { $match: { status: "SUCCESS" } },
      { $unwind: "$courses" },
      {
        $lookup: {
          from: "courses",
          localField: "courses",
          foreignField: "_id",
          as: "courseInfo",
        },
      },
      { $unwind: "$courseInfo" },
      { $match: { "courseInfo.instructorId": instructorId } },
      {
        $group: {
          _id: null,
          total: { $sum: "$courseInfo.price" },
        },
      },
    ]);
    return result[0]?.total || 0;
  }

  async getTotalCourseSales(instructorId: Types.ObjectId): Promise<number> {
    const result = await this.orderRepo.aggregate([
      { $match: { status: "SUCCESS" } },
      { $unwind: "$courses" },
      {
        $lookup: {
          from: "courses",
          localField: "courses",
          foreignField: "_id",
          as: "courseInfo",
        },
      },
      { $unwind: "$courseInfo" },
      { $match: { "courseInfo.instructorId": instructorId } },
      { $count: "totalSales" },
    ]);
    return result[0]?.totalSales || 0;
  }
}
