import { IStudentCheckoutService } from "../interface/IStudentCheckoutService";
import { IStudentCheckoutRepository } from "../../repositories/interfaces/IStudentCheckoutRepository";
import { razorpay } from "../../utils/razorpay";
import { Types } from "mongoose";
import { IOrder } from "../../models/orderModel";
import { IPayment } from "../../models/paymentModel";
import { IEnrollment } from "../../models/enrollmentModel";
import { IStudentCartRepository } from "../../repositories/interfaces/IStudentCartRepository";

export class StudentCheckoutService implements IStudentCheckoutService {
  constructor(
    private readonly checkoutRepo: IStudentCheckoutRepository,
    private readonly cartRepo: IStudentCartRepository
  ) {}

// async initiateCheckout(
//   userId: Types.ObjectId,
//   courseIds: Types.ObjectId[],
//   totalAmount: number
// ): Promise<IOrder> {
//   try {
//     const razorpayOrder = await razorpay.orders.create({
//       amount: totalAmount * 100,
//       currency: "INR",
//       receipt: `receipt_order_${Date.now()}`,
//     });

//     const order = await this.checkoutRepo.createOrder(
//       userId,
//       courseIds,
//       totalAmount,
//       razorpayOrder.id
//     );

//     return order;
//   } catch (err) {
//     console.error("❌ Razorpay order creation failed:", err);
//     throw err;
//   }
// }

async initiateCheckout(
  userId: Types.ObjectId,
  courseIds: Types.ObjectId[],
  totalAmount: number
): Promise<IOrder> {
  try {
    // 1. Get enrolled course IDs
    const enrolledCourseIds = await this.checkoutRepo.getEnrolledCourseIds(userId);

    // 2. Check for overlap
    const alreadyEnrolled = courseIds.filter(cid =>
      enrolledCourseIds.some(eid => eid.equals(cid))
    );

    // 3. If overlap, get names and throw error
    if (alreadyEnrolled.length > 0) {
      const names = await this.checkoutRepo.getCourseNamesByIds(alreadyEnrolled);
      throw new Error(`Remove ${names.join(", ")} from cart, already enrolled.`);
    }

    // 4. Proceed to Razorpay creation
    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount * 100,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    });

    const order = await this.checkoutRepo.createOrder(
      userId,
      courseIds,
      totalAmount,
      razorpayOrder.id
    );

    return order;
  } catch (err) {
    console.error("❌ Checkout Error:", err);
    throw err;
  }
}


  async verifyAndCompleteCheckout(
    orderId: Types.ObjectId,
    paymentId: string,
    method: string,
    amount: number
  ): Promise<{
    order: IOrder;
    payment: IPayment;
    enrollments: IEnrollment[];
  }> {
    const updatedOrder = await this.checkoutRepo.updateOrderStatus(orderId, "SUCCESS");

    const payment = await this.checkoutRepo.savePayment({
      orderId,
      userId: updatedOrder!.userId,
      paymentId,
      method,
      amount,
      status: "SUCCESS",
    });

    const enrollments = await this.checkoutRepo.createEnrollments(
      updatedOrder!.userId,
      updatedOrder!.courses
    );

    await this.cartRepo.clear(updatedOrder!.userId)

    return {
      order: updatedOrder!,
      payment,
      enrollments,
    };
  }
}
