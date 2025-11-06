/**
 * @param {string} eng - english ability name
 * @returns {string} kor - korean ability name
 */
export const getAbilName = (eng: string) => {
  switch (eng) {
    case "technicalExpertiseScore":
      return "기술 역량";
    case "softSkillsScore":
      return "소프트스킬";
    case "problemSolvingScore":
      return "문제 해결력";
    case "growthPotentialScore":
      return "성장 가능성";
  }
};
