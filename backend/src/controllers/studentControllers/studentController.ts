import { Request,Response } from "express";
import IStudentControllers from "./interfaces/IStudentController";
import IStudentService from "src/services/interface/IStudentService";

export class StudentController implements IStudentControllers{
    private studentService : IStudentService

    constructor(studentService : IStudentService){
        this.studentService = studentService
    }

    async studentSignUp(req: Request, res: Response): Promise<void> {
        try {
            const userData = req.body
            const user = await this.studentService.signup(userData)
            res.status(201).json({
                success:true,
                message:"signup successful",
                data:user
            })
        } catch (error:any) {
            res.status(400).json({
                success:false,
                message:error.message || "signup failed"
            })
        }
    }
}