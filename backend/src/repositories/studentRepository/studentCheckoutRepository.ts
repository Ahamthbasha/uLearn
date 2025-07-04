import { IStudentCheckoutRepository } from "../interfaces/IStudentCheckoutRepository";
import { OrderRepository } from "../OrderRepository";
import { PaymentRepository } from "../PaymentRepository";
import { EnrollmentRepository } from "../EnrollmentRepository";
import { Types } from "mongoose";
import { IOrder } from "../../models/orderModel";
import { IPayment } from "../../models/paymentModel";
import { IEnrollment } from "../../models/enrollmentModel";

export class StudentCheckoutRepository implements IStudentCheckoutRepository {
  private orderRepo = new OrderRepository();
  private paymentRepo = new PaymentRepository();
  private enrollmentRepo = new EnrollmentRepository();

  async createOrder(
    userId: Types.ObjectId,
    courseIds: Types.ObjectId[],
    amount: number,
    razorpayOrderId: string
  ): Promise<IOrder> {
    return this.orderRepo.create({
      userId,
      courses: courseIds,
      amount,
      status: "PENDING",
      gateway: "razorpay",
      gatewayOrderId: razorpayOrderId,
    } as Partial<IOrder>) ;
  }

  async updateOrderStatus(orderId: Types.ObjectId, status: "SUCCESS" | "FAILED"): Promise<IOrder | null> {
    return this.orderRepo.update(orderId.toString(), { status });
  }

  async savePayment(data: Partial<IPayment>): Promise<IPayment> {
    return this.paymentRepo.create(data);
  }

  async createEnrollments(userId: Types.ObjectId, courseIds: Types.ObjectId[]): Promise<IEnrollment[]> {
    const enrollments = courseIds.map(courseId => ({
      userId,
      courseId,
      completionStatus: "NOT_STARTED",
      certificateGenerated: false,
      enrolledAt: new Date(),
    }));
    return this.enrollmentRepo.create(enrollments as Partial<IEnrollment>[]);
  }
}
