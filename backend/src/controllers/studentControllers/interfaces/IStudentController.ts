

import { Request,Response } from "express";

export default interface IStudentControllers{
    studentSignUp(req:Request,res:Response) : Promise<void>
}