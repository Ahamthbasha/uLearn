import { Request, Response } from "express";
import { IAdminController } from "./inteface/IAdminController";
import { IAdminService } from "../../services/interface/IAdminService";
import { JwtService } from "../../utils/jwt";
import { config } from "dotenv";
import { Roles, StatusCode } from "../../utils/enums";
import { AdminErrorMessages, AdminSuccessMessages } from "../../utils/constants";

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
                messgae:email !== adminEmail ? AdminErrorMessages.EMAIL_INCORRECT : AdminErrorMessages.PASSWORD_INCORRECT
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
}