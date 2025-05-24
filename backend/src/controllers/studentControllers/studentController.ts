import { Request, Response } from "express";
import IStudentController from "./interfaces/IStudentController";
import IStudentServices from "../../services/interface/IStudentService";
import IOtpServices from "../../services/interface/IOtpService";
import { OtpGenerate } from "../../utils/otpGenerator";
import { JwtService } from "../../utils/jwt";
import bcrypt from "bcrypt";
import { StudentErrorMessages, StudentSuccessMessages } from "../../utils/constants";
import { Roles, StatusCode } from "../../utils/enums";

export class StudentController implements IStudentController {
  private studentService: IStudentServices;
  private otpService: IOtpServices;

  private otpGenerator: OtpGenerate;
  private JWT: JwtService;

  constructor(studentService: IStudentServices, otpService: IOtpServices) {
    this.studentService = studentService;
    this.otpService = otpService;

    this.otpGenerator = new OtpGenerate();

    this.JWT = new JwtService();
  }

   async studentSignUp(req: Request, res: Response): Promise<any> {
    try {
      let { email, password, username } = req.body;

      const saltRound = 10;
      const hashedPassword = await bcrypt.hash(password, saltRound);
      password = hashedPassword;

      const ExistingStudent = await this.studentService.findByEmail(email);

      if (ExistingStudent) {
        return res.json({
          success: false,
          message: StudentErrorMessages.USER_ALREADY_EXISTS,
          user: ExistingStudent,
        });
      } else {
        const otp = await this.otpGenerator.createOtpDigit();

        await this.otpService.createOtp(email, otp)

        const token = await this.JWT.createToken({
          email,
          password,
          username,
          role: Roles.STUDENT,
        });

        return res.status(StatusCode.CREATED).json({
          success: true,
          message: StudentSuccessMessages.SIGNUP_SUCCESS,
          token,
        });
      }
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }

 async resendOtp(req: Request, res: Response): Promise<any> {
    try {
      let { email } = req.body;

      const otp = await this.otpGenerator.createOtpDigit();
      await this.otpService.createOtp(email, otp),

      res.status(StatusCode.OK).json({
        success: true,
        message: StudentSuccessMessages.OTP_SENT,
      });
    } catch (error: any) {
      throw error;
    }
  }

 async createUser(req: Request, res: Response): Promise<any> {
    try {
      const { otp } = req.body;

      const token = req.headers["the-verify-token"] || "";
      if (typeof token != "string") {
        throw new Error();
      }
      const decode = await this.JWT.verifyToken(token);
      if (!decode) {
        return new Error(StudentErrorMessages.TOKEN_INVALID);
      }
      const resultOtp = await this.otpService.findOtp(decode.email);
      console.log(resultOtp?.otp, "<>", otp);
      if (resultOtp?.otp === otp) {
        const user = await this.studentService.createUser(decode);

        if (user) {
          await this.otpService.deleteOtp(user.email);

          return res.status(StatusCode.CREATED).json({
            success: true,
            message: StudentSuccessMessages.USER_CREATED,
            user,
          });
        }
      } else {
        return res.json({
          success: false,
          message: StudentErrorMessages.INCORRECT_OTP,
        });
      }
    } catch (error: any) {
      throw error
    }
  }

  async login(req:Request,res:Response):Promise<any>{
    try {
        let {email,password} = req.body

        let student = await this.studentService.findByEmail(email)

        if(!student){
            return res.status(StatusCode.NOT_FOUND).json({
                success:false,
                message:StudentErrorMessages.INVALID_CREDENTIALS
            })
        }

        let passwordMatch = await bcrypt.compare(password,student.password)

        if(!passwordMatch){
            return res.status(StatusCode.NOT_FOUND).json({
                success:false,
                message:StudentErrorMessages.INVALID_CREDENTIALS 
            })
        }

        let role = student.role
        let id = student.id

        const accessToken = await this.JWT.accessToken({id,role,email})

        const refreshToken = await this.JWT.refreshToken({id,role,email})

        console.log("ACCESS TOKEN:",accessToken)
        console.log("REFRESHTOKEN:",refreshToken)
        return res
        .status(StatusCode.OK)
        .cookie("accessToken",accessToken,{httpOnly:true})
        .cookie("refreshToken",refreshToken,{httpOnly:true})
        .send({
            success:true,
            message:"user logged successfully",
            user:student
        })
    } catch (error) {
        throw error
    }
  }

  async logout(_req:Request,res:Response){
    try {
        res.clearCookie("accessToken")
        res.clearCookie("refreshToken")

        res.status(StatusCode.OK).send({success:true,message:StudentSuccessMessages.LOGOUT_SUCCESS})
    } catch (error) {
        throw error
    }
  }
}

