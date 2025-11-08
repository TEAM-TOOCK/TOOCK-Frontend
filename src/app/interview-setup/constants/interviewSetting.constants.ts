export const INTERVIEW_SETTING_CONFIG = [
  {
    id: 0,
    label: "지원 기업",
  },
  {
    id: 1,
    label: "모집 파트",
  },
  {
    id: 2,
    label: "지원 직무",
  },
];

export interface InterviewOptionData {
  id: number;
  value: string;
  label: string;
}

export const INIT_INTERVIEW_OPTION = {
  id: -1,
  label: "",
  value: "",
};

export const INTERVIEW_COMPANY_LIST: InterviewOptionData[] = [
  {
    id: 0,
    value: "삼성에스디에스(주)",
    label: "삼성에스디에스(주)",
  },
  {
    id: 1,
    value: "(주)넥슨코리아",
    label: "(주)넥슨코리아",
  },
  {
    id: 2,
    value: "(주)신한디에스",
    label: "(주)신한디에스",
  },
  {
    id: 3,
    value: "(주)엔씨소프트",
    label: "(주)엔씨소프트",
  },
  {
    id: 4,
    value: "(주)카카오",
    label: "(주)카카오",
  },
  {
    id: 5,
    value: "네이버(주)",
    label: "네이버(주)",
  },
  {
    id: 6,
    value: "라인플러스(주)",
    label: "라인플러스(주)",
  },
  {
    id: 7,
    value: "에스케이(주)",
    label: "에스케이(주)",
  },
];

export const INTERVIEW_FIELD_CATEGORY: InterviewOptionData[] = [
  {
    id: 0,
    value: "DEVELOPMENT",
    label: "개발",
  },
  {
    id: 1,
    value: "DATA",
    label: "데이터",
  },
  {
    id: 2,
    value: "RND",
    label: "연구개발",
  },
];

export const INTERVIEW_FIELD_LIST: InterviewOptionData[] = [
  {
    id: 0,
    value: "FRONTEND",
    label: "프론트엔드",
  },
  {
    id: 1,
    value: "BACKEND",
    label: "백엔드",
  },
  {
    id: 2,
    value: "DEVOPS",
    label: "데브옵스",
  },
];
