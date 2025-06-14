import { Request, Response } from 'express';
import { IAdminVerificationService } from '../../services/interface/IAdminVerificationService';
import { StatusCode } from '../../utils/enums';
import { ResponseError } from '../../utils/constants';
import { getPresignedUrl } from '../../utils/getPresignedUrl';

export class AdminVerificationController {
  private verificationService: IAdminVerificationService;

  constructor(verificationService: IAdminVerificationService) {
    this.verificationService = verificationService;
  }

  async getAllRequests(_req: Request, res: Response): Promise<void> {
    try {
      const requestData = await this.verificationService.getAllRequests();

      res.status(StatusCode.OK).json({ data: requestData });
    } catch (error:any) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
  }

async getRequestData(req: Request, res: Response): Promise<void> {
  try {
    const { email } = req.params;
    const requestData = await this.verificationService.getRequestDataByEmail(email);

    if (!requestData) {
      res.status(StatusCode.NOT_FOUND).json({
        success: false,
        message: "Verification request not found.",
      });
      return;
    }

    // ✅ Use existing keys from DB (they contain the S3 object key)
    const resumeUrl = await getPresignedUrl(requestData.resumeUrl);
    const degreeCertificateUrl = await getPresignedUrl(requestData.degreeCertificateUrl);

    res.status(StatusCode.OK).json({
      data: {
        ...requestData.toObject(), // ensure it's a plain object
        resumeUrl,
        degreeCertificateUrl,
      },
    });
  } catch (error: any) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
}


  async approveRequest(req: Request, res: Response): Promise<void> {
    try {
      const { email, status } = req.body;
      const approvedRequest = await this.verificationService.approveRequest(email, status);

      if (approvedRequest?.status === 'approved') {
        res.status(StatusCode.OK).json({
          success: true,
          message: ResponseError.APPROVE_INSTRUCTOR,
          data: approvedRequest
        });
      } else if (approvedRequest?.status === 'rejected') {
        res.status(StatusCode.OK).json({
          success: true,
          message: ResponseError.REJECT_INSTRUCTOR,
          data: approvedRequest
        });
      } else {
        res.status(StatusCode.BAD_REQUEST).json({ success: false, message: 'Invalid request status' });
      }
    } catch (error:any) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
  }
}
