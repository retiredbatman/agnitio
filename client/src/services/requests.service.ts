import { Request } from "../models/request";
import axiosApiInstance from "../utils/axios";
import { getBaseURL } from "../utils/baseURL";

const baseURL = getBaseURL();

export const getRequests = async () => {
    const response = await axiosApiInstance.get<Request[]>(`${baseURL}/api/requests`);
    return response.data;
}

export const createRequest = async (formData: FormData) => {
    const response = await axiosApiInstance.post(`${baseURL}/api/requests`, formData , {
        // 👇 Set headers manually for single file upload
        headers: {
          'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}