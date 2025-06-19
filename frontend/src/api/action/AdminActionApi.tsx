import { API } from "../../service/axios";

import AdminRoutersEndPoints from "../../types/endPoints/adminEndPoint";

export const getAllUser = async (page = 1, limit = 1, search = ''): Promise<any> => {
  try {
    const response = await API.get(`${AdminRoutersEndPoints.adminGetUsers}?page=${page}&limit=${limit}&search=${search}`, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
    console.log("API Call Params =>", { page, limit, search });

    console.log("getAll users in adminAction api", response.data);
    return response.data; // contains {users, total}
  } catch (error) {
    throw error;
  }
};


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


export const getAllInstructor = async(page = 1, limit = 1, search = '') : Promise<any> => {
    try {
        const response = await API.get(`${AdminRoutersEndPoints.adminGetInstructors}?page=${page}&limit=${limit}&search=${search}`,{
            headers:{'Content-Type':'application/json'},
            withCredentials:true
        })

        console.log("Instructor API Call Params =>", { page, limit, search });

        console.log('getall instructors',response.data)
        return response.data
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

export const getAllVerificationRequests = async (page = 1, limit = 10, search = ''): Promise<any> => {
  try {
    const response = await API.get(
      `${AdminRoutersEndPoints.adminGetVerifcationsRequest}?page=${page}&limit=${limit}&search=${search}`,
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );

    console.log("Verification API Call Params =>", { page, limit, search });
    console.log("Verification request response =>", response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};


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
