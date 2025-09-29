import { backendURL } from '@/api/client';
import { saveAccessToken, saveRefreshToken } from '@/core/secureStorage';
import { VerifyCodeResponse } from '@/types/auth';
import axios from 'axios';


/**
 * Requests a verification code to be sent to the given email.
 * @param email - The user's email.
 */
export async function requestEmailCode(email: string): Promise<void> {
    try {
        const response = await axios.post(backendURL, { email });
    } catch (error) {
        console.error('API: requestEmailCode', error);
    }
}

export async function postEmailCode(
    email: string,
    code: number,
): Promise<VerifyCodeResponse> {
    try {
        const response = await axios.post<VerifyCodeResponse>(
            backendURL, { email, code }
        );
        await saveAccessToken(response.data.access_token);
        await saveRefreshToken(response.data.refresh_token);
        return response.data;
    } catch (error: any) {
        throw new Error('API: postEmailCode', error);
    }
}

export async function debugAuth(email: string): Promise<VerifyCodeResponse> {
    try {
        const response = await axios.post('http://192.168.0.90:8000/api/login/debug-auth', { email });
        await saveAccessToken(response.data.access_token);
        await saveRefreshToken(response.data.refresh_token);
        console.log('DEBUG: DEBUG AUTH WITH EMAIL:', email);
        return response.data;
    } catch (error: any) {
        throw new Error('DEBUG: FAILED DEBUG AUTH', error);
    }
}