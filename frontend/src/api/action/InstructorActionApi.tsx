import InstructorRouterEndPoints from "../../types/endPoints/instructorEndPoint";

import { API } from "../../service/axios";

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