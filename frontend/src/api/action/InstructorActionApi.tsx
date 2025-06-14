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

        return response.data
    } catch (error) {
        console.log(error)
    }
}