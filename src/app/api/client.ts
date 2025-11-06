import ky from "ky";

export interface ApiResponse<T = unknown> {
  code: string;
  message: string;
  success: boolean;
  data?: T;
}

export const client = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60000,
  hooks: {
    beforeRequest: [
      (request) => {
        const accessToken = sessionStorage.getItem("accessToken");
        if (accessToken) request.headers.set("Authorization", `Bearer ${accessToken}`);
      },
    ],
    // afterResponse: [
    //   async (request, options, response) => {
    //     const apiResponse = (await response.clone().json()) as ApiResponse;
    //   },
    // ],
  },
  retry: {
    limit: 2,
    methods: ["get", "put", "head", "delete", "options", "trace"],
  },
});
