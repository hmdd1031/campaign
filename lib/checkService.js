import emailjs from "@emailjs/browser";
import checklist from "@/data/checklist.json";

export const CATEGORIES = checklist.categories;

export const ALL_QUESTIONS = CATEGORIES.flatMap((c) =>
  c.questions.map((q) => ({ ...q, categoryId: c.id, categoryName: c.name }))
);

// 카테고리별 위험 응답 수 계산
export function calculateCategoryScores(answers) {
  return CATEGORIES.map((c) => {
    const riskCount = c.questions.filter(
      (q) => answers[q.id] === q.riskAnswer
    ).length;
    return { id: c.id, name: c.name, value: riskCount };
  });
}

// 종합 등급 계산: 0~2 안전 / 3~5 주의 / 6개 이상 위험
export function calculateGrade(totalRisk) {
  if (totalRisk <= 2) return { label: "안전", level: "safe" };
  if (totalRisk <= 5) return { label: "주의", level: "warning" };
  return { label: "위험", level: "danger" };
}

export function calculateScore(answers) {
  const categoryScores = calculateCategoryScores(answers);
  const totalRisk = categoryScores.reduce((sum, c) => sum + c.value, 0);
  const grade = calculateGrade(totalRisk);
  const riskyQuestions = ALL_QUESTIONS.filter(
    (q) => answers[q.id] === q.riskAnswer
  );
  return { categoryScores, totalRisk, grade, riskyQuestions };
}

// ---------------------------------------------------------------------------
// 1단계: 로컬 계산만 (백엔드 없음) — 지금은 이 버전이 활성화되어 있습니다.
// ---------------------------------------------------------------------------
export async function submitCheckResult(answers) {
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem("bd_result", JSON.stringify(answers));
  }
  return calculateScore(answers);
}

// ---------------------------------------------------------------------------
// 2단계: 백엔드 연결 시 아래 주석을 해제하고 위 함수를 대체하세요.
// 컴포넌트는 submitCheckResult()만 호출하므로 화면단 재작업이 필요 없습니다.
// ---------------------------------------------------------------------------
// export async function submitCheckResult(answers) {
//   const res = await fetch("/api/submit", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(answers),
//   });
//   return res.json();
// }

// ---------------------------------------------------------------------------
// 진단 결과 이메일 발송 (EmailJS)
// EmailJS 템플릿(template_rm39499)의 "To Email" 필드가 {{user_email}} 로
// 변수 바인딩 되어 있어야 실제 사용자에게 메일이 갑니다.
// ---------------------------------------------------------------------------
const EMAILJS_SERVICE_ID = "service_t49dffg";
const EMAILJS_TEMPLATE_ID = "template_rm39499";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export async function sendResultEmail({
  userEmail,
  grade,
  gradeBg,
  gradeBorder,
  gradeColor,
  categoryGridHtml,   // 추가
  riskCategoriesHtml,
  solutionsHtml,
}) {
  if (!EMAILJS_PUBLIC_KEY) {
    throw new Error(
      "EmailJS public key가 설정되지 않았습니다. .env.local에 NEXT_PUBLIC_EMAILJS_PUBLIC_KEY를 추가하세요."
    );
  }

  return emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    {
      user_email: userEmail,
      grade,
      grade_bg: gradeBg,
      grade_border: gradeBorder,
      grade_color: gradeColor,
      category_grid: categoryGridHtml,   // 추가
      risk_categories: riskCategoriesHtml,
      solutions_text: solutionsHtml,
      time: new Date().toLocaleString("ko-KR"),
    },
    EMAILJS_PUBLIC_KEY
  );
}