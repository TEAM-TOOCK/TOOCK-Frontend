import { client } from "../client"

interface loginApiResponse {
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