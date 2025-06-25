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
    } catch (error:any) {
        if(error.response && error.response.data){
            return error.response.data
        }
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
    } catch (error:any) {
        if(error.response && error.response.data){
            return error.response.data
        }
    }
}

//FETCH CATEGORY

export const getInstructorCategories = async (): Promise<any[]> => {
    try {
        const response = await API.get("/api/instructor/categories", {
          withCredentials: true,
        });
        return response.data.data;    
    } catch (error) {
        throw error
    }
};

//course management actions

export const instructorCreateCourse = async (formData: FormData): Promise<any> => {
    try {
        const response = await API.post(InstructorRouterEndPoints.instructorCreateCourse,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            },
            withCredentials:true
          }
        );
        return response.data;    
    } catch (error) {
        throw error
    }
};

// Update Course
export const instructorUpdateCourse = async (
  courseId: string,
  formData: FormData
): Promise<any> => {
    try {
        const response = await API.put(`${InstructorRouterEndPoints.instructorUpdateCourse}/${courseId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials:true
          }
        );
        return response.data;
    } catch (error) {
        throw error
    }
};

// Delete Course
export const instructorDeleteCourse = async (courseId: string): Promise<any> => {
    try {
        const response = await API.delete(
          `${InstructorRouterEndPoints.instructorDeleteCourse}/${courseId}`,{
              withCredentials:true
          }
        );
        return response.data;    
    } catch (error) {
        throw error
    }
};

// Get Course By ID
export const instructorGetCourseById = async (courseId: string): Promise<any> => {
    try {
        const response = await API.get(`${InstructorRouterEndPoints.instructorGetCourseById}/${courseId}`,{
          withCredentials:true
        }
        );
        return response.data;   
    } catch (error) {
        throw error
    }
};

export const fetchInstructorCourses = async () => {
    try {
        const response = await API.get(InstructorRouterEndPoints.instructorGetCreatedCourses,{
            withCredentials:true
        }); // Use correct endpoint
        return response.data.data;
    } catch (error) {
        throw error
    }
};