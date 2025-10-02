import { ApiResponse, client } from "../client";

interface CompanyAndJob {
  company: string[];
  field: string[];
  job: string[];
}

interface CompanyAndJobListApiResponse extends ApiResponse {
  data: CompanyAndJob;
}

export const fetchCompanyAndJobList = async () => {
  try {
    const response = await client.get("company-job-list").json<CompanyAndJobListApiResponse>();
    console.log(response);
    return response;
  } catch (error) {
    console.error("[Company And Job List Fetch Error]", error);
    return null;
  }
};
