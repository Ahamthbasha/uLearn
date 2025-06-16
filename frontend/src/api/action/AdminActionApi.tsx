import { API } from "../../service/axios";

import AdminRoutersEndPoints from "../../types/endPoints/adminEndPoint";

export const getAllUser = async():Promise<any> => {
    try {
        const response = await API.get(AdminRoutersEndPoints.adminGetUsers,{
            headers:{'Content-Type':'application/json'},
            withCredentials:true
        })

        console.log("getAll users in adminAction api",response)

        return response?.data?.users
    } catch (error) {
        throw error
    }
}

export const blockUser = async(email:string) => {
    try {
        const response = await API.get(`${AdminRoutersEndPoints.adminBlockUser}/${email}`,{
            headers:{'Content-Type':'application/json'},
            withCredentials:true
        })

        console.log("block user in adminAction",response.data)

        return response.data
    } catch (error) {
        throw error
    }
}


export const getAllInstructor = async() : Promise<any> => {
    try {
        const response = await API.get(AdminRoutersEndPoints.adminGetInstructors,{
            headers:{'Content-Type':'application/json'},
            withCredentials:true
        })

        console.log('getall instructors',response.data.instructors)
        return response.data.instructors
    } catch (error) {
        throw error
    }
}


export const blockInstructor = async(email:string):Promise<any> => {
    try {
        const response = await API.get(`${AdminRoutersEndPoints.adminBlockInstructor}/${email}`,{
            headers:{'Content-Type':'application/json'},
            withCredentials:true
        })

        console.log("block instructor",response.data)

        return response.data
    } catch (error) {
        throw error
    }
}

export const getAllVerificationRequests = async () => {
    try {
        const response = await API.get(AdminRoutersEndPoints.adminGetVerifcationsRequest,{
            headers:{'Content-Type' :'application/json'},
            withCredentials:true
        })

        console.log('verification list in adminaction api',response.data)

        return response.data
    } catch (error) {
        throw error
    }
}

export const getVerificationRequestByemail = async(email:string) => {
    try {
        const response = await API.get(`${AdminRoutersEndPoints.adminGetVerificationByEamil}/${email}`,{
            headers:{"Content-Type" : "application/json"},
            withCredentials:true
        })
        console.log('getspecific verification request in adminAction api',response.data)

        return response.data
    } catch (error) {
        throw error
    }
}

// export const updateVerificationStatus = async (email:string,status:"approved"|"rejected",reason?:string) => {
//     try {
//         const response = await API.post(AdminRoutersEndPoints.adminApproveVerification,{email,status},{
//             headers:{"Content-Type":"application/json"},
//             withCredentials:true
//         })

//         console.log('approved request',response.data)
//         return response.data
//     } catch (error) {
//         throw error
//     }
// }

export const updateVerificationStatus = async (
  email: string,
  status: "approved" | "rejected",
  reason?: string  // ✅ Add this optional field
) => {
  try {
    const body: { email: string; status: string; reason?: string } = {
      email,
      status,
    };

    if (status === "rejected" && reason) {
      body.reason = reason; // ✅ Attach reason only for rejected status
    }

    const response = await API.post(
      AdminRoutersEndPoints.adminApproveVerification,
      body,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    console.log("approved/rejected request", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
