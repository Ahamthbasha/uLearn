import { Request, Response } from "express";
import IStudentController from "./interfaces/IStudentController";
import IStudentService from "../../services/interface/IStudentService";
import IOtpServices from "src/services/interface/IOtpService";
import { OtpGenerate } from "../../utils/otpGenerator";
import { JwtService } from "../../utils/jwt";
import bcrypt from "bcrypt";
import { StudentErrorMessages, StudentSuccessMessages } from "../../utils/constants";
import { Roles, StatusCode } from "../../utils/enums";


export class StudentController implements IStudentController {
    private studentService: IStudentService;
    private otpService:IOtpServices;
    private otpGenerate:OtpGenerate;
    private JWT:JwtService;

    constructor(studentService: IStudentService,otpService:IOtpServices) {
        this.studentService = studentService;
        this.otpService = otpService
        this.otpGenerate = new OtpGenerate()
        this.JWT = new JwtService()
    }

    async studentSignUp(req: Request, res: Response): Promise<any> {
        try {
            let {email,password,username} = req.body

            const saltRound = 10
            const hashedPassword = await bcrypt.hash(password,saltRound)
            password = hashedPassword

            const existingStudent = await this.studentService.findByEmail(email)

            if(existingStudent){
                return res.json({
                    success:false,
                    message:StudentErrorMessages.USER_ALREADY_EXISTS,
                    user:existingStudent
                })
            }else{
                const otp = await this.otpGenerate.createOtpDigit()

                await this.otpService.createOtp(email,otp)

                const token = await this.JWT.createToken({
                    username,
                    email,
                    role:Roles.STUDENT
                })

                return res.status(StatusCode.CREATED).json({
                    success:true,
                    message:StudentSuccessMessages.SIGNUP_SUCCESS,
                    token
                })
            }
        } catch (error: any) {
            console.log(error)
            return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
                success:false,
                message:"Internal server error",
                error:error.message
            })
        }
    }

    async resendOtp(req:Request,res:Response):Promise<any>{
        try {         
            let {email} = req.body
    
            const otp = await this.otpGenerate.createOtpDigit()
            await this.otpService.createOtp(email,otp)
    
            res.status(StatusCode.OK).json({
                success:true,
                message:StudentSuccessMessages.OTP_SENT
            })
        } catch (error) {
            throw error
        }
    }

    async createUser(req: Request, res: Response): Promise<any> {
        try {
            let {otp,password} = req.body

            const token = req.headers['the-verify-token']

            if(typeof token != 'string'){
                throw new Error
            }

            const decode=await this.JWT.verifyToken(token)

            if(!decode){
                throw new Error(StudentErrorMessages.TOKEN_INVALID)
            }

            const resultOtp = await this.otpService.findOtp(decode.email)

            console.log(resultOtp?.otp,"<>",otp)

            if(resultOtp?.otp == otp){
                const user = await this.studentService.createUser({...decode,password})

                if(user){
                    await this.otpService.deleteOtp(user.email)

                    return res.status(StatusCode.CREATED).json({
                        success:true,
                        message:StudentSuccessMessages.USER_CREATED,
                        user
                    })
                }
            }else{
                return res.json({
                    success:false,
                    message:StudentErrorMessages.INCORRECT_OTP
                })
            }
        } catch (error) {
            throw error
        }
    }
}