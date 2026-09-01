import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";
import { CATEGORIES, ALL_QUESTIONS } from "@/lib/checkService";

export default function ChecklistScreen({
  answers,
  setAnswers,
  index,
  setIndex,
  onFinish,
}) {
  const q = ALL_QUESTIONS[index];
  const currentCategoryIdx = CATEGORIES.findIndex((c) => c.id === q.categoryId);
  const answered = answers[q.id] !== undefined;

  function choose(value) {
    setAnswers((prev) => ({ ...prev, [q.id]: value }));
  }

  function next() {
    if (index === ALL_QUESTIONS.length - 1) {
      onFinish();
    } else {
      setIndex(index + 1);
    }
  }

  return (
    <div className="grid md:grid-cols-[220px_1fr] gap-8 px-6 md:px-10 py-10">
      {/* 사이드바 (모바일에서는 진행바로 대체) */}
      <div>
        <p className="text-[13px] text-neutral-400 mb-4">
          진단 진행 ({currentCategoryIdx + 1}/4)
        </p>
        <div className="md:hidden mb-4">
          <ProgressBar value={((index + 1) / ALL_QUESTIONS.length) * 100} />
        </div>
        <div className="hidden md:flex flex-col gap-1">
          {CATEGORIES.map((c, i) => {
            const done = i < currentCategoryIdx;
            const current = i === currentCategoryIdx;
            return (
              <div
                key={c.id}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-[14px] ${
                  current ? "bg-neutral-100 font-medium text-navy" : "text-neutral-400"
                }`}
              >
                {done ? (
                  <Check className="w-4 h-4 shrink-0" />
                ) : (
                  <span
                    className={`w-4 h-4 rounded-full border shrink-0 ${
                      current ? "border-navy" : "border-neutral-300"
                    }`}
                  />
                )}
                {c.name}
              </div>
            );
          })}
        </div>
      </div>

      {/* 질문 카드 */}
      <div className="max-w-md">
        <p className="text-[13px] font-medium text-neutral-400 mb-3">
          Q{index + 1} · {q.categoryName}
        </p>
        <h2 className="text-[22px] font-semibold leading-snug mb-8">{q.text}</h2>
        <div className="grid grid-cols-2 gap-3 mb-10">
          {["예", "아니오"].map((opt) => (
            <button
              key={opt}
              onClick={() => choose(opt)}
              className={`py-4 rounded-lg border text-[15px] font-medium transition ${
                answers[q.id] === opt
                  ? "border-navy bg-navy text-white"
                  : "border-neutral-200 hover:border-neutral-400"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={() => index > 0 && setIndex(index - 1)}
            disabled={index === 0}
            className="inline-flex items-center gap-1 text-[14px] text-neutral-500 disabled:opacity-30 hover:text-navy transition"
          >
            <ChevronLeft className="w-4 h-4" /> 이전
          </button>
          <button
            onClick={next}
            disabled={!answered}
            className="inline-flex items-center gap-1 bg-navy text-white text-[14px] font-medium px-5 py-2.5 rounded-lg disabled:opacity-30 hover:bg-navy-dark transition"
          >
            {index === ALL_QUESTIONS.length - 1 ? "결과 보기" : "다음"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
