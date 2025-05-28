import {API} from "../../service/axios"

import authenticationRoutes from "../../types/endPoints/authEndpoints"

import type { userData } from "../../types/userData"

import type { Login } from "../../types/LoginTypes"

export const signup = async (userData:userData):Promise<any>=>{
    try {
        console.log("userData",userData)
        const response = await API.post(authenticationRoutes.studentSignUp,userData)
        console.log(response)
        return response.data
    } catch (error:any) {
        if(error.response.status == 404){
            throw error
        }
        console.log(error.message)
    }
}

export const resendOtp = async(email:string):Promise<any>=>{
    try {
        const response = await API.post(authenticationRoutes.studentResendOtp,{email})
        console.log("resend otp for student",response.data)
        return response.data
    } catch (error) {
        throw error
    }
}

export const verifyOtp = async(otp:string):Promise<any>=>{
    try {
        const response = await API.post(authenticationRoutes.studentVerifyOtp,{otp})
        console.log("otpverification for student",response.data)
        return response.data
    } catch (error) {
        throw error
    }
}

export const login = async({email,password,role}:Login):Promise<any>=>{
    try {
        const response = await API.post(authenticationRoutes.studentLogin,{email,password,role})

        console.log("login response data",response.data)

        return response.data
    } catch (error) {
        throw error
    }
}

export const logout = async() : Promise<any> => {
    try {
        const response = await API.post(authenticationRoutes.studentLogout,{},{withCredentials:true})
        console.log("student logout",response.data)
        return response.data
    } catch (error) {
        throw error
    }
}