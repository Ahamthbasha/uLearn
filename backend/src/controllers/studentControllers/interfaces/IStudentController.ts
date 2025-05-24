import { Request, Response } from "express";

export default interface IStudentController {
    studentSignUp(req: Request, res: Response): Promise<void>;
    resendOtp(req:Request,res:Response):Promise<void>;
    createUser(req:Request,res:Response):Promise<void>;
    login(req:Request,res:Response):Promise<void>;
    logout(req:Request,res:Response):Promise<void>;
}