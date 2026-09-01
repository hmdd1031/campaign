"use client";

import { useState } from "react";
import { ShieldCheck, StickyNote } from "lucide-react";
import { ALL_QUESTIONS } from "@/lib/checkService";
import { getIcon } from "@/lib/iconMap";
import GuideModal from "@/components/GuideModal";

export default function SolutionScreen({ answers, onRestart, onBack }) {
  const riskyQuestions = ALL_QUESTIONS.filter((q) => answers[q.id] === q.riskAnswer);
  const [guideQuestion, setGuideQuestion] = useState(null);

  const BackButton = () => (
    <button
      onClick={onBack}
      className="text-[13px] text-neutral-500 hover:text-neutral-900 mb-4 inline-flex items-center gap-1"
    >
      ← 결과로 돌아가기
    </button>
  );

  if (riskyQuestions.length === 0) {
    return (
      <div className="px-6 md:px-10 py-16 max-w-2xl text-center mx-auto">
        <BackButton />
        <ShieldCheck className="w-10 h-10 mx-auto mb-4 text-emerald-600" />
        <h2 className="text-[20px] font-semibold mb-2">
          모든 항목을 안전하게 관리하고 계세요
        </h2>
        <p className="text-[14px] text-neutral-500 mb-8">
          지금처럼 계정, 기기, SNS 습관을 계속 점검해주세요.
        </p>
        <button
          onClick={onRestart}
          className="text-[14px] font-medium border border-neutral-300 rounded-lg px-5 py-2.5 hover:border-blue-900 transition"
        >
          처음부터 다시 진단하기
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-10 py-10 max-w-3xl">
      <BackButton />
      <p className="text-[13px] text-neutral-400 mb-2">맞춤 솔루션</p>
      <h2 className="text-[22px] font-semibold mb-8">
        취약한 항목 {riskyQuestions.length}개를 바로 개선해보세요
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-8">
        {riskyQuestions.map((q) => {
          const Icon = getIcon(q.solution.icon);
          return (
            <div key={q.id} className="border border-neutral-200 rounded-xl p-6 flex flex-col">
              <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center mb-3.5">
                <Icon className="w-5 h-5" strokeWidth={1.8} aria-hidden="true" />
              </div>
              <p className="font-semibold text-[16px] mb-1.5 text-neutral-900">
                {q.solution.title}
              </p>
              <p className="text-[14px] text-neutral-600 leading-relaxed mb-4 flex-1">
                {q.solution.desc}
              </p>
              {q.solution.link?.startsWith("http") ? (
                <a
                  href={q.solution.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-medium text-neutral-900 hover:underline inline-flex items-center gap-1"
                >
                  {q.solution.linkText} →
                </a>
              ) : (
                <button
                  onClick={() => setGuideQuestion(q)}
                  aria-label={`${q.solution.title} 가이드 보기`}
                  className="text-[13px] font-medium text-neutral-900 hover:underline text-left inline-flex items-center gap-1 w-fit"
                >
                  {q.solution.linkText} →
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="border border-amber-200 bg-amber-50 rounded-xl p-6 flex items-start gap-3">
        <StickyNote className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <p className="font-medium text-[14px] text-amber-900">
          가장 경각심을 느낀 부분이나, 지금 지킬 것을 포스트잇에 적어주세요
        </p>
      </div>

      <div className="text-center mt-10">
        <button
          onClick={onRestart}
          className="text-[13px] text-neutral-400 hover:text-neutral-900 transition"
        >
          처음부터 다시 진단하기
        </button>
      </div>

      {guideQuestion && (
        <GuideModal
          solution={guideQuestion.solution}
          onClose={() => setGuideQuestion(null)}
        />
      )}
    </div>
  );
}