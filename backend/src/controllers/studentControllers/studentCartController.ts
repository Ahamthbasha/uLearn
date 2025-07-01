import { Response } from "express";
import { Types } from "mongoose";
import { IStudentCartService } from "../../services/interface/IStudentCartService";
import { IStudentCartController } from "./interfaces/IStudentCartController";
import { StatusCode } from "../../utils/enums";
import { StudentErrorMessages } from "../../utils/constants";
import { getPresignedUrl } from "../../utils/getPresignedUrl";
import { AuthenticatedRequest } from "../../middlewares/AuthenticatedRoutes";

export class StudentCartController implements IStudentCartController {
  private cartService: IStudentCartService;

  constructor(cartService: IStudentCartService) {
    this.cartService = cartService;
  }

  async getCart(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = new Types.ObjectId(req.user?.id);
      const cart = await this.cartService.getCart(userId);

      if (cart) {
        for (const course of cart.courses as any[]) {
          if (course.thumbnailUrl) {
            course.thumbnailUrl = await getPresignedUrl(course.thumbnailUrl);
          }
        }

        res.status(StatusCode.OK).json({
          success: true,
          message: "Cart fetched successfully",
          data: cart,
        });
      } else {
        res.status(StatusCode.OK).json({
          success: true,
          message: "Cart is empty",
          data: null,
        });
      }
    } catch (error) {
      console.error("getCart error:", error);
      res.status(StatusCode.UNAUTHORIZED).json({
        success: false,
        message: StudentErrorMessages.TOKEN_INVALID,
      });
    }
  }

  async addToCart(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = new Types.ObjectId(req.user?.id);
      const courseId = new Types.ObjectId(req.body.courseId);

      const cart = await this.cartService.getCart(userId);
      const alreadyInCart = cart?.courses.some(
        (c) => c.toString() === courseId.toString()
      );

      if (alreadyInCart) {
      res.status(StatusCode.CONFLICT).json({
          success: false,
          message: "Course is already in cart",
        });
        return
      }

      const updatedCart = await this.cartService.addToCart(userId, courseId);
      res.status(StatusCode.OK).json({
        success: true,
        message: "Course added to cart",
        data: updatedCart,
      });
    } catch (error) {
      console.error("addToCart error:", error);
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to add course to cart",
      });
    }
  }

  async removeFromCart(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = new Types.ObjectId(req.user?.id);
      const courseId = new Types.ObjectId(req.params.courseId);

      const updatedCart = await this.cartService.removeFromCart(userId, courseId);
      res.status(StatusCode.OK).json({
        success: true,
        message: "Course removed from cart",
        data: updatedCart,
      });
    } catch (error) {
      console.error("removeFromCart error:", error);
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to remove course from cart",
      });
    }
  }

  async clearCart(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = new Types.ObjectId(req.user?.id);
      const clearedCart = await this.cartService.clearCart(userId);
      res.status(StatusCode.OK).json({
        success: true,
        message: "Cart cleared",
        data: clearedCart,
      });
    } catch (error) {
      console.error("clearCart error:", error);
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to clear cart",
      });
    }
  }
}
