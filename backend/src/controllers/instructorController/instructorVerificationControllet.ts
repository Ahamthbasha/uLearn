import { Request, Response } from 'express';
import { IInstructorVerificationService } from '../../services/interface/IInstructorVerificationService';
import { uploadToS3Bucket } from '../../utils/s3Bucket';
import { StatusCode } from '../../utils/enums';
import { VerificationErrorMessages, VerificationSuccessMessages } from '../../utils/constants';

export class InstructorVerificationController {
  private verificationService: IInstructorVerificationService;

  constructor(verificationService: IInstructorVerificationService) {
    this.verificationService = verificationService;
  }

  async submitRequest(req: Request, res: Response): Promise<void> {
    try {
      const { name, email } = req.body;

      if (!req.files || typeof req.files !== 'object') {
        throw new Error(VerificationErrorMessages.DOCUMENTS_MISSING);
      }

      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const degreeCertificate = files.degreeCertificate?.[0] || null;
      const resume = files.resume?.[0] || null;

      if (degreeCertificate && resume) {
        const degreeCertificateUrl = await uploadToS3Bucket(degreeCertificate, 'degreeCertificate');
        const resumeUrl = await uploadToS3Bucket(resume, 'resume');

        const status = 'pending';

        const response = await this.verificationService.sendVerifyRequest(
          name,
          email,
          degreeCertificateUrl,
          resumeUrl,
          status
        );

        res.status(StatusCode.OK).send({
          success: true,
          message: VerificationSuccessMessages.VERIFICATION_REQUEST_SENT,
          data: response
        });
      } else {
        res.status(StatusCode.BAD_REQUEST).send({
          success: false,
          message: VerificationErrorMessages.NO_DOCUMENTS_RECEIVED
        });
      }
    } catch (error:any) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
  }
}
