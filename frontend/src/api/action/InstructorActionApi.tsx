import InstructorRouterEndPoints from "../../types/endPoints/instructorEndPoint";

import { API } from "../../service/axios";

//verification api call

export const sendVerification = async (formData:FormData)=>{
    try {
        const response = await API.post(InstructorRouterEndPoints.instructorSendVerificationRequest,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        })
        console.log('sendVerification request',response.data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getVerificationRequestByemail = async (email:string) =>{
    try {
        const response = await API.get(`${InstructorRouterEndPoints.instructorGetVerificationStatus}/${email}`,{
            withCredentials:true
        })

        console.log('instructorVerification detail',response.data)

        return response.data
    } catch (error) {
        throw error
    }
}

//profile management api call

export const instructorGetProfile = async() =>{
    try {
        const response = await API.get(InstructorRouterEndPoints.instructorProfilePage,{
            withCredentials:true
        })
    
        console.log('instructor profile data response',response.data)

        return response.data
    } catch (error) {
        throw error
    }
}

export const instructorUpdateProfile = async(formData:FormData):Promise<any> => {
    try {
        const response = await API.put(InstructorRouterEndPoints.instructorUpdateProfile,formData,{
            headers:{"Content-Type":"multipart/form-data"},
            withCredentials:true
        })

        console.log('instructor updateprofile response',response.data)

        return response.data
    } catch (error) {
        throw error
    }
}

export const instructorUpdatePassword = async(data:any):Promise<any>=>{
    try {
        const response = await API.put(InstructorRouterEndPoints.instructorUpdatePassword,data,{
            withCredentials:true
        })

        console.log('instructor password updation data',response.data)

        return response.data
    } catch (error) {
        throw error
    }
}