// src/api/actions/s3Actions.ts
import { API } from "../service/axios";
import UserRouterEndpoints from "../types/endPoints/userEndPoint";

export const getPresignedUrl = async (key: string): Promise<string> => {
  try {
    const response = await API.get(UserRouterEndpoints.userGetPresignUrl+`/?key=${key}`, {
      withCredentials: true,
    });

    return response.data.url;
  } catch (error) {
    console.error("Error fetching presigned URL", error);
    throw error;
  }
};
