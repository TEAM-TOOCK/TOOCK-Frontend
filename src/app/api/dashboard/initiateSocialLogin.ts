import { ApiResponse, client } from "../client"

interface loginApiResponse extends ApiResponse {
    accessToken: string;
    tokenType: string;
    memberId: number;
    email: string;
    name: string;
}

export const initiateSocialLogin = async () => {
    try {
        const response = await client.get(`/oauth2/authorization/google`)
    }
}