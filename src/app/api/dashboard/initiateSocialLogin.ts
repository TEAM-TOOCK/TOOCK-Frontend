import { ApiResponse, client } from "../client";

export interface loginData {
  accessToken: string;
  tokenType: string;
  memberId: number;
  email: string;
  name: string;
}

interface LoginApiResponse extends ApiResponse {
  data: loginData;
}

export const initiateSocialLogin = async () => {
  try {
    const response = await client.get(`oauth2/authorization/google`).json<LoginApiResponse>();
    return response.data;
  } catch (error) {
    console.error(error);
    throw error instanceof Error ? error : new Error("initiateSocialLogin failed");
  }
};
