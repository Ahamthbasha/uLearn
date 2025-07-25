import {Request,Response} from 'express'

export interface IStudentProfileController{
    getProfile(req:Request,res:Response) : Promise<void>;
    updateProfile(req:Request,res:Response) : Promise<void>
    updatePassword(req:Request,res:Response) : Promise<void>
}