import ky from "ky";

export interface ApiResponse<T = unknown> {
  status: number;
  message: string;
  data?: T;
}

export const client = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        const apiResponse = (await response.clone().json()) as ApiResponse;
      },
    ],
  },
  retry: {
    limit: 2,
    methods: ["get", "put", "head", "delete", "options", "trace"],
  },
});
