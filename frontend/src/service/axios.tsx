import axios from "axios";
import dotenv from 'dotenv'

dotenv.config()

export const API = axios.create({
    baseURL : process.env.BASEURL,
    headers:{
        "Content-Type":"application/json",
        withCredentials:true,
        credentials:'include'
    }
})

API.interceptors.request.use(
    (config)=>{
        const verificationToken = localStorage.getItem("verificationToken")
        const verificationTokenStudent = localStorage.getItem("verificationTokenStudent")

        if(verificationToken){
            config.headers["the-verify-token"] = verificationToken
        }

        if(verificationTokenStudent){
            config.headers['the-verify-token'] = verificationTokenStudent
        }

        return config
    },
    (error)=>{
        console.log(error)
    }
)

API.interceptors.response.use(
    (response) => response,
    (error)=>{
        if(error.response){
            if(error.response.status === 401){
                const studentData = localStorage.getItem("verificationTokenStudent")
                const data = localStorage.getItem("verificationToken")
                if(studentData){
                    localStorage.removeItem('studentData')
                }

                if(data){
                    localStorage.removeItem("data")
                }
            }
        }
        else{
            console.error("Network or unknown error:",error)
        }
        return Promise.reject(error)
    }
)