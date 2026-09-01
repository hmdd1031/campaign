"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import RadarChart from "@/components/RadarChart";
import { calculateScore, sendResultEmail, ALL_QUESTIONS } from "@/lib/checkService";

const GRADE_STYLE = {
  safe: "text-emerald-700 bg-emerald-50 border-emerald-200",
  warning: "text-amber-700 bg-amber-50 border-amber-200",
  danger: "text-red-700 bg-red-50 border-red-200",
};

// 이메일 인라인 스타일용 hex 값 (Tailwind emerald/amber/red 팔레트와 동일)
const GRADE_EMAIL_STYLE = {
  safe: { bg: "#ecfdf5", border: "#a7f3d0", color: "#047857" },
  warning: { bg: "#fffbeb", border: "#fde68a", color: "#b45309" },
  danger: { bg: "#fef2f2", border: "#fecaca", color: "#b91c1c" },
};

export default function ResultScreen({ answers, onSeeSolutions }) {
  const [emailOptIn, setEmailOptIn] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const { categoryScores, grade } = calculateScore(answers);
  const riskyCategoryCount = categoryScores.filter((c) => c.value > 0).length;

  // SolutionScreen과 동일한 방식으로 위험 문항 추출
  const riskyQuestions = ALL_QUESTIONS.filter((q) => answers[q.id] === q.riskAnswer);

  function buildCategoryGridHtml() {
    // 카테고리별 점수 카드를 이메일 안전한 <table> 2열 그리드로 렌더링
    const cellHtmlList = categoryScores.map((c) => {
      const isRisky = c.value > 0;
      const valueColor = isRisky ? "#dc2626" : "#059669"; // red-600 / emerald-600
      return `
        <td width="50%" style="padding:6px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
            style="border:1px solid #e5e5e0; border-radius:10px;">
            <tr>
              <td style="padding:14px 16px;">
                <p style="margin:0 0 6px; font-size:12px; color:#737373;">${c.name}</p>
                <p style="margin:0; font-size:20px; font-weight:700; color:${valueColor};">
                  ${c.value}<span style="font-size:12px; font-weight:400; color:#a3a3a3;"> / 3 위험</span>
                </p>
              </td>
            </tr>
          </table>
        </td>`;
    });
 
    // 2개씩 묶어서 행(row)으로 배치
    const rows = [];
    for (let i = 0; i < cellHtmlList.length; i += 2) {
      const pair = [cellHtmlList[i], cellHtmlList[i + 1]].filter(Boolean);
      rows.push(`<tr>${pair.join("")}</tr>`);
    }
 
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows.join("")}</table>`;
  }
 
  function buildRiskCategoriesHtml() {
    return categoryScores
      .filter((c) => c.value > 0)
      .map(
        (c) =>
          `<div style="margin-bottom:4px;">▸ ${c.name} <span style="color:#a3a3a3;">(${c.value}/3 위험)</span></div>`
      )
      .join("");
  }

const CTA_LINK = "https://kidc.eprivacy.go.kr/"; // 하단 CTA 버튼과 동일한 주소

  function buildSolutionsHtml() {
    return riskyQuestions
      .map((q) => {
        const s = q.solution;
        const hasExternalLink = s.link?.startsWith("http");
        const isDuplicateOfCta = s.link === CTA_LINK;

        // 가이드가 있으면 단계를 번호 목록으로 풀어서 보여줌
        const guideHtml = s.guide
          ? `
            <ol style="margin:8px 0 0; padding-left:18px; color:#404040;">
              ${s.guide.steps
                .map(
                  (step) =>
                    `<li style="margin-bottom:4px;"><b>${step.title}</b> — ${step.desc}</li>`
                )
                .join("")}
            </ol>
            ${
              s.guide.tip
                ? `<p style="margin:8px 0 0; padding:8px 10px; background:#fafaf8; border-radius:6px; font-size:12px; color:#737373;">💡 ${s.guide.tip}</p>`
                : ""
            }`
          : "";

        let actionHtml;
        if (isDuplicateOfCta) {
          // 하단 CTA 버튼과 같은 링크면 다시 걸지 않고, 거기로 안내만 함
          actionHtml = `<p style="margin:0; font-size:12px; color:#a3a3a3;">↓ 아래 '내 정보 유출 여부 확인하기' 버튼에서 바로 확인할 수 있어요</p>`;
        } else if (hasExternalLink) {
          actionHtml = `<a href="${s.link}" style="color:#111111; font-weight:600; text-decoration:none;">${s.linkText} →</a>`;
        } else {
          actionHtml = guideHtml;
        }

        return `
          <div style="margin-bottom:20px; padding-bottom:20px; border-bottom:1px solid #eeeeec;">
            <p style="margin:0 0 4px; font-weight:700; color:#111111;">${s.title}</p>
            <p style="margin:0 0 6px; color:#525252;">${s.desc}</p>
            ${actionHtml}
          </div>`;
      })
      .join("");
  }

  async function handleSendEmail() {
    if (!email.includes("@")) {
      setError("올바른 이메일 주소를 입력해주세요.");
      return;
    }
    setError("");
    setSending(true);

    const emailStyle = GRADE_EMAIL_STYLE[grade.level];

    try {
      await sendResultEmail({
        userEmail: email,
        grade: grade.label,
        gradeBg: emailStyle.bg,
        gradeBorder: emailStyle.border,
        gradeColor: emailStyle.color,
        categoryGridHtml: buildCategoryGridHtml(),
        riskCategoriesHtml: buildRiskCategoriesHtml(),
        solutionsHtml: buildSolutionsHtml(),
      });
      setSent(true);
    } catch (err) {
      console.error("메일 발송 실패", err);
      setError("메일 발송에 실패했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="px-6 md:px-10 py-10 max-w-3xl">
      <p className="text-[13px] text-neutral-400 mb-2">진단 결과</p>
      <div className="flex items-center gap-3 mb-8">
        <span
          className={`text-[12px] font-medium border rounded-full px-2.5 py-1 ${GRADE_STYLE[grade.level]}`}
        >
          {grade.label}
        </span>
        <h2 className="text-[22px] font-semibold">
          <span className="text-blue-900 font-bold">4개</span> 영역 중{" "}
          <span className="text-blue-900 font-bold">{riskyCategoryCount}개</span> 영역에서
          개선이 필요해요
        </h2>
      </div>

      <div className="grid md:grid-cols-[300px_1fr] gap-8 items-center mb-10">
        <div className="flex justify-center">
          <RadarChart scores={categoryScores} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {categoryScores.map((c) => (
            <div key={c.id} className="border border-neutral-200 rounded-xl p-4">
              <p className="text-[13px] text-neutral-500 mb-1 break-keep">{c.name}</p>
              <p
                className={`text-[22px] font-semibold ${
                  c.value > 0 ? "text-red-600" : "text-emerald-600"
                }`}
              >
                {c.value}
                <span className="text-[13px] text-neutral-400 font-normal"> / 3 위험</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between border-t border-neutral-200 pt-6">
        <button
          onClick={onSeeSolutions}
          className="inline-flex items-center gap-2 bg-blue-900 text-white text-[14px] font-medium px-5 py-3 rounded-lg hover:bg-blue-950 transition w-fit"
        >
          맞춤 솔루션 보기 <ArrowRight className="w-4 h-4" />
        </button>

        <label className="flex items-center gap-2 text-[13px] text-neutral-600 cursor-pointer">
          <input
            type="checkbox"
            checked={emailOptIn}
            onChange={(e) => setEmailOptIn(e.target.checked)}
            className="w-4 h-4"
          />
          결과를 이메일로 받기 (선택, 개인정보 수집 동의 필요)
        </label>
      </div>

      {emailOptIn && (
        <div className="mt-4 border border-neutral-200 rounded-xl p-5 bg-neutral-50">
          <p className="text-[12px] text-neutral-500 leading-relaxed mb-3">
            수집 목적: 진단 결과 메일 발송 · 보유 기간: 캠페인 종료 시까지 ·
            파기 시점: 캠페인 종료 직후 일괄 파기됩니다. 메일에는 위험
            카테고리명과 솔루션 안내만 포함되며 민감정보는 포함되지 않습니다.
          </p>
          {!sent ? (
            <>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="이메일 주소를 입력하세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 border border-neutral-200 rounded-lg px-3 py-2 text-[14px] outline-none focus:border-blue-900"
                />
                <button
                  onClick={handleSendEmail}
                  disabled={sending}
                  className="bg-blue-900 text-white text-[14px] font-medium px-4 py-2 rounded-lg hover:bg-blue-950 transition disabled:opacity-50"
                >
                  {sending ? "발송 중..." : "받기"}
                </button>
              </div>
              {error && <p className="text-[13px] text-red-600 mt-2">{error}</p>}
            </>
          ) : (
            <p className="text-[13px] text-emerald-700 font-medium">
              결과를 보냈어요. 메일함을 확인해주세요.
            </p>
          )}
        </div>
      )}
    </div>
  );
}