import { Request, Response } from "express";
import { IAdminController } from "./interface/IAdminController";
import { IAdminService } from "../../services/interface/IAdminService";
import { JwtService } from "../../utils/jwt";
import { config } from "dotenv";
import { Roles, StatusCode } from "../../utils/enums";
import { AdminErrorMessages, AdminSuccessMessages, ResponseError } from "../../utils/constants";

config()

export class AdminController implements IAdminController{
    private adminService : IAdminService
    private JWT :JwtService
    constructor(adminService : IAdminService){
        this.adminService = adminService
        this.JWT = new JwtService()
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
           let {email,password} = req.body
           
           let adminEmail = process.env.ADMINEMAIL 
           let adminPassword = process.env.ADMINPASSWORD

           if(email !== adminEmail || password != adminPassword){
            res.send({
                success:false,
                message:email !== adminEmail ? AdminErrorMessages.EMAIL_INCORRECT : AdminErrorMessages.PASSWORD_INCORRECT
            })
            return
           }

           let admin
           admin = await this.adminService.getAdminData(email)
           try {
               if(!admin){
                admin = await this.adminService.createAdmin({ email, password });
               }
           } catch (error) {
            throw error
           }

           const accessToken = await this.JWT.accessToken({email,role:Roles.ADMIN,id:admin?._id})

           res
           .cookie("accessToken",accessToken)
           .cookie("refreshToken",accessToken)
           .status(StatusCode.OK)
           .send({
            success:true,
            message:AdminSuccessMessages.LOGIN_SUCCESS,
            token:accessToken,
            data:{
                email,
                role:Roles.ADMIN,
                name:Roles.ADMIN,
                adminId : admin?._id
            }
           })
        } catch (error) {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
                success:false,
                message:AdminErrorMessages.INTERNAL_SERVER_ERROR
            })
        }
    }

    async logout(_req: Request, res: Response): Promise<void> {
        try {
            res.clearCookie("accessToken")
            res.clearCookie("refreshToken")

            res.status(StatusCode.OK).send({
                success:true,
                message:AdminSuccessMessages.LOGOUT_SUCCESS
            })
        } catch (error) {
            throw error 
        }
    }

    async getAllUsers(_req: Request, res: Response): Promise<any> {
        try {
           const users = await this.adminService.getAllUsers()

           console.log("get all users in admin controller",users)

           if(users && users.length > 0){
           return res.status(StatusCode.OK)
            .json({
                success:true,
                message:ResponseError.FETCH_USER,
                users
            })
           }else{
            return res.status(StatusCode.NOT_FOUND).json({
                success:false,
                message:ResponseError.USER_NOT_FOUND
            })
           }
        } catch (error) {
            throw error
        }
    }

    async getAllInstructors(_req: Request, res: Response): Promise<any> {
        try {
            const instructors = await this.adminService.getAllInstructors()
            
            console.log("all instructors in admin controller",instructors)

            if(instructors && instructors.length > 0){
                return res.status(StatusCode.OK)
                .json({
                    success:true,
                    message:ResponseError.FETCH_INSTRUCTOR,
                    instructors
                })
            }else{
                return res.status(StatusCode.NOT_FOUND)
                .json({
                    success:false,
                    message:ResponseError.FETCH_NOT_INSTRUCTOR
                })
            }
        } catch (error) {
            throw error
        }
    }

    async blockUser(req: Request, res: Response): Promise<any> {
        try {
            const {email} = req.params

            const userData = await this.adminService.getUserData(email)

            if(!userData){
                return res.status(StatusCode.NOT_FOUND)
                .json({
                    success:false,
                    message:ResponseError.USER_NOT_FOUND
                })
            }

            const emailId = userData.email
            const isBlocked = !userData ?.isBlocked

            const userStatus = await this.adminService.updateProfile(emailId,{isBlocked})

            return res.status(StatusCode.OK).json({
                success:true,
                message:userStatus?.isBlocked ? ResponseError.ACCOUNT_BLOCKED : ResponseError.ACCOUNT_UNBLOCKED
            })
        } catch (error) {
            return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
                success:false,
                message:ResponseError.INTERNAL_SERVER_ERROR
            })
        }
    }

    async blockInstructor(req: Request, res: Response): Promise<any> {
        try {
            const {email} = req.params
            const userData = await this.adminService.getInstructorData(email)

            if(!userData){
                return res.status(StatusCode.NOT_FOUND).json({
                    success:false,
                    message:ResponseError.NOT_FOUND
                })
            }

            const emailId = userData.email
            const isBlocked = !userData?.isBlocked

            const userStatus = await this.adminService.updateInstructorProfile(emailId,{isBlocked})

            return res.status(StatusCode.OK)
            .json({
                success:true,
                message:userStatus?.isBlocked ? ResponseError.ACCOUNT_BLOCKED : ResponseError.ACCOUNT_UNBLOCKED
            })
        } catch (error) {
            return res.status(StatusCode.OK)
            .json({
                success:false,
                message:ResponseError.INTERNAL_SERVER_ERROR
            })
        }
    }
}