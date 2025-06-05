import jwt from 'jsonwebtoken'
import { Request,Response,NextFunction } from 'express'
import { JwtService } from '../utils/jwt'
import { AuthErrorMsg } from '../utils/constants'
import { StatusCode } from '../utils/enums'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET as string

interface AuthenticatedRequest extends Request{
    user?:{
        user:string,
        email:string,
        role:string,
        iat:number,
        exp:number
    }
}

const authenticationToken = async(req:AuthenticatedRequest,res:Response,next:NextFunction):Promise<any> =>{
    const accessToken = req.cookies.accessToken
    const refreshToken = req.cookies.refreshToken

    if(!accessToken){
        return res.status(StatusCode.UNAUTHORIZED).json({failToken:true,message:AuthErrorMsg.NO_ACCESS_TOKEN})
    }

    try {
        
    } catch (error) {
        
    }
}