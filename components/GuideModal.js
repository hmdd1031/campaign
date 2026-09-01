"use client";

import { X, Lightbulb } from "lucide-react";

export default function GuideModal({ solution, onClose }) {
  if (!solution?.guide) return null;
  const { steps = [], tip } = solution.guide;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-6 pt-6 pb-4 sticky top-0 bg-white">
          <div>
            <p className="text-[13px] text-neutral-400 mb-1">가이드</p>
            <h3 className="text-[17px] font-semibold">{solution.title}</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:bg-neutral-100 hover:text-navy transition shrink-0"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        <div className="px-6 pb-6">
          <ol className="space-y-4 mb-5">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-navy text-white text-[12px] font-medium flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium text-[14px] mb-0.5">{step.title}</p>
                  <p className="text-[13px] text-neutral-500 leading-relaxed">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          {tip && (
            <div className="flex gap-2 bg-neutral-50 border border-neutral-200 rounded-lg p-3.5 mb-6">
              <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-[12.5px] text-neutral-600 leading-relaxed">{tip}</p>
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full bg-navy text-white text-[14px] font-medium py-3 rounded-lg hover:bg-navy-dark transition"
          >
            확인했어요
          </button>
        </div>
      </div>
    </div>
  );
}
