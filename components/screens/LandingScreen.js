import Image from "next/image";
import { ArrowRight } from "lucide-react";
import logo from "@/public/logo.png";

export default function LandingScreen({ onStart }) {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-10 px-6 md:px-10 py-12 md:py-16 items-center">
        <div>
          <span className="inline-block text-[13px] font-medium text-neutral-600 bg-neutral-100 rounded-full px-3 py-1 mb-5">
            개인정보 보호 실천 체험 캠페인
          </span>
          <h1 className="text-[32px] md:text-[38px] font-bold leading-[1.25] tracking-tight mb-4">
            내 개인정보,
            <br />
            내가 지킨다
          </h1>
          <p className="text-neutral-600 text-[15px] leading-relaxed mb-8">
            12개 문항으로 계정, 기기, SNS, 생활 습관까지 나의 개인정보 보호
            수준을 3분 만에 진단해보세요.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={onStart}
              className="inline-flex items-center gap-2 bg-navy text-white text-[14px] font-medium px-5 py-3 rounded-lg hover:bg-navy-dark active:scale-[0.98] transition"
            >
              진단 시작하기 <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-[13px] text-neutral-400">약 3분 소요</span>
          </div>
        </div>
        <div className="flex justify-center items-center bg-neutral-50 rounded-2xl border border-neutral-200 aspect-square p-16">
          <Image src={logo} alt="BackDoor 로고" className="w-full h-full object-contain" priority />
        </div>
      </div>
    </div>
  );
}
