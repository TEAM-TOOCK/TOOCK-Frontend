import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("*/company-job-list", ({ request }) => {
    return HttpResponse.json({
      isSuccess: true,
      code: 200,
      message: "회사 리스트 조회 성공",
      data: {
        company: ["삼성 SDS", "LINE PLUS", "NAVER", "KAKAO"],
        field: ["개발", "연구개발", "데이터"],
        job: ["FRONTEND", "BACKEND", "DEVOPS"],
      },
    });
  }),
  // http.get("*/interview-questions", ({ request }) => {
  //   const url = new URL(request.url);
  //   const company = url.searchParams.get("company");
  //   const job = url.searchParams.get("job");
  //   console.log(company, job);
  //   return HttpResponse.json({
  //     isSuccess: true,
  //     code: 200,
  //     message: "인터뷰 질문 조회 성공",
  //     data: [
  //       {
  //         id: 1,
  //         question: `${company}에 지원하게 된 동기는 무엇인가요?`,
  //       },
  //       {
  //         id: 2,
  //         question: `${job} 직무에 관심을 가지게된 이유는 무엇인가요?`,
  //       },
  //       {
  //         id: 3,
  //         question: `${job} 직무에 대하여 본인이 가지고 있는 기술 스택에 대해 알려주세요.`,
  //       },
  //       {
  //         id: 4,
  //         question: `${job} 직무와 관련해 수행했던 프로젝트 경험에 대해 설명해주세요`,
  //       },
  //     ],
  //   });
  // }),
  http.post("*/send-interview", async ({ request }) => {
    // FormData 파싱
    const form = await request.formData();
    const file = form.get("file");
    console.log("왜 안돼...");

    // "file" 필드 유효성 체크
    if (!(file instanceof File)) {
      return HttpResponse.json(
        {
          isSuccess: false,
          code: 400,
          message: "업로드할 파일이 없습니다. (필드명: file)",
        },
        { status: 400 }
      );
    }

    // 파일 메타데이터 수집
    const meta = {
      filename: file.name,
      mimeType: file.type,
      size: file.size, // 바이트 단위
    };

    // 필요하면 파일 내용을 실제로 읽을 수도 있음
    // const buf = await file.arrayBuffer();
    setTimeout(() => {}, 5000);

    // 업로드 성공 응답 (실 서비스라면 업로드 처리 결과/URL 등을 내려주면 됨)
    return HttpResponse.json({
      isSuccess: true,
      code: 200,
      message: "오디오 업로드 성공",
      data: {
        uploadId: crypto.randomUUID?.() ?? String(Date.now()),
        ...meta,
        // 예시: 변환 결과나 저장 위치 등을 내려줄 수도 있어요.
        // url: "https://cdn.example.com/uploads/record.m4a"
      },
    });
  }),
  http.get("*/interview-results", ({ request }) => {
    const url = new URL(request.url);
    const company = url.searchParams.get("company");
    const job = url.searchParams.get("job");
    console.log(company, job);
    return HttpResponse.json({
      isSuccess: true,
      code: 200,
      message: "면접 결과 조회 성공",
      data: {
        totalScore: 9,
        detailScore: {
          technic: 8,
          communication: 10,
          logic: 6,
          problemSolving: 0,
        },
        AIfeedback: "제법 잘했지만 별로다 닝겐 앞으로는 좀 더 열심히 하도록 하하하핳하하하하하하하핳하하하하핳",
        questionAndAnswer: [
          {
            id: 0,
            question: "아아아아아",
            answer: "아아아아안ㄴㄴㄴㄴ",
          },
          {
            id: 1,
            question: "아아아아아",
            answer: "아아아아안ㄴㄴㄴㄴ",
          },
          {
            id: 2,
            question: "아아아아아",
            answer: "아아아아안ㄴㄴㄴㄴ",
          },
          {
            id: 3,
            question: "아아아아아",
            answer: "아아아아안ㄴㄴㄴㄴ",
          },
        ],
        improvementProposal: {
          strength: [
            {
              id: 0,
              text: "명확하고 논리적인 답변 구성",
            },
            {
              id: 1,
              text: "구체적인 프로젝트 경험 제시",
            },
            {
              id: 2,
              text: "적절한 기술적 용어 사용",
            },
          ],
          weekness: [
            {
              id: 0,
              text: "답변 시간 조절 (너무 길거나 짧지 않게)",
            },
            {
              id: 1,
              text: "더 구체적인 수치나 결과 제시",
            },
            {
              id: 2,
              text: "팀워크 경험에 대한 구체적 사례 준비",
            },
          ],
        },
      },
    });
  }),
  http.get("*/interview-records", ({ request }) => {
    return HttpResponse.json({
      isSuccess: true,
      code: 200,
      message: "인터뷰 기록 조회 성공",
      data: [
        {
          id: 0,
          company: "메타",
          job: "프론트엔드 개발자",
          date: "2025-06-28",
          totalScore: 8,
          totalQuestionNum: 5,
        },
        {
          id: 1,
          company: "메타",
          job: "프론트엔드 개발자",
          date: "2025-06-28",
          totalScore: 4,
          totalQuestionNum: 3,
        },
        {
          id: 2,
          company: "애플",
          job: "백엔드 개발자",
          date: "2025-06-28",
          totalScore: 7,
          totalQuestionNum: 2,
        },
        {
          id: 3,
          company: "삼성",
          job: "데이터 엔지니어",
          date: "2025-06-28",
          totalScore: 10,
          totalQuestionNum: 5,
        },
      ],
    });
  }),
  http.get("*/interview-record-detail", ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    console.log(id);
    return HttpResponse.json({
      isSuccess: true,
      code: 200,
      message: "면접 레코드 상세정보 조회 성공",
      data: {
        totalScore: 9,
        detailScore: {
          technic: 8,
          communication: 10,
          logic: 6,
          problemSolving: 0,
        },
        AIfeedback: "제법 잘했지만 별로다 닝겐 앞으로는 좀 더 열심히 하도록 하하하핳하하하하하하하핳하하하하핳",
        questionAndAnswer: [
          {
            id: 0,
            question: "아아아아아",
            answer: "아아아아안ㄴㄴㄴㄴ",
          },
          {
            id: 1,
            question: "아아아아아",
            answer: "아아아아안ㄴㄴㄴㄴ",
          },
          {
            id: 2,
            question: "아아아아아",
            answer: "아아아아안ㄴㄴㄴㄴ",
          },
          {
            id: 3,
            question: "아아아아아",
            answer: "아아아아안ㄴㄴㄴㄴ",
          },
        ],
        improvementProposal: {
          strength: [
            {
              id: 0,
              text: "명확하고 논리적인 답변 구성",
            },
            {
              id: 1,
              text: "구체적인 프로젝트 경험 제시",
            },
            {
              id: 2,
              text: "적절한 기술적 용어 사용",
            },
          ],
          weekness: [
            {
              id: 0,
              text: "답변 시간 조절 (너무 길거나 짧지 않게)",
            },
            {
              id: 1,
              text: "더 구체적인 수치나 결과 제시",
            },
            {
              id: 2,
              text: "팀워크 경험에 대한 구체적 사례 준비",
            },
          ],
        },
      },
    });
  }),
];
