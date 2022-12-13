import { Token } from "../models/token";
import { getBaseURL } from "../utils/baseURL";

const baseURL = getBaseURL();

export const login = async (userName: string): Promise<Token> => {
    const response = await fetch(`${baseURL}/api/login`, {
        method: 'POST',
        body: JSON.stringify({
            userName
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}

export const refreshAccessToken = async (): Promise<Token> => {
    const access_token = JSON.parse(localStorage.getItem('token') as string) ;
    const response = await fetch(`${baseURL}/api/refreshToken`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
    });
    return response.json();
}